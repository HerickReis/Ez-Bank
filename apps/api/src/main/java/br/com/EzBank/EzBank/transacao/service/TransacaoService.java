// br/com/EzBank/EzBank/transacao/service/TransacaoService.java
package br.com.EzBank.EzBank.transacao.service;

import br.com.EzBank.EzBank.categorias.model.Categoria;
import br.com.EzBank.EzBank.categorias.repository.RepositoryCategoria;
import br.com.EzBank.EzBank.conta.model.Conta;
import br.com.EzBank.EzBank.conta.model.ContaFisica; // Importar
import br.com.EzBank.EzBank.conta.model.ContaJuridica; // Importar
import br.com.EzBank.EzBank.conta.repository.ContaRepository;
import br.com.EzBank.EzBank.dto.TransacaoDTO;
import br.com.EzBank.EzBank.exceptions.BusinessException;
import br.com.EzBank.EzBank.transacao.model.Transacao;
import br.com.EzBank.EzBank.transacao.repository.TransacaoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Importar

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository transacaoRepository;
    @Autowired
    private ContaRepository contaRepository;
    @Autowired
    private RepositoryCategoria categoriaRepository;

    // Cria e salva uma nova transação, ATUALIZANDO o saldo da conta correta.
    @Transactional // Garante que tudo será salvo ou não
    public Transacao salvar(TransacaoDTO dto) {

        Conta conta = contaRepository.findById(dto.getIdConta())
                .orElseThrow(() -> new BusinessException("Conta com ID " + dto.getIdConta() + " não encontrada."));

        Categoria categoria = categoriaRepository.findById(dto.getIdCategoria())
                .orElseThrow(() -> new BusinessException("Categoria com ID " + dto.getIdCategoria() + " não encontrada."));


        if ("SAIDA".equalsIgnoreCase(dto.getTipo())) {
            // Se for SAIDA, subtraí
            subtrairSaldo(conta, dto.getValor());
        } else if ("ENTRADA".equalsIgnoreCase(dto.getTipo())) {
            // Se for ENTRADA, soma
            somarSaldo(conta, dto.getValor());
        } else {
            throw new BusinessException("Tipo de transação inválido: " + dto.getTipo() + ". Use 'ENTRADA' ou 'SAIDA'.");
        }

        // 3. Criação da Entidade Transacao
        Transacao transacao = new Transacao();
        transacao.setConta(conta);
        transacao.setCategoria(categoria);
        transacao.setTipo(dto.getTipo());
        transacao.setValor(dto.getValor());
        transacao.setDataTransacao(dto.getDataTransacao() != null ? dto.getDataTransacao() : LocalDate.now());

        return transacaoRepository.save(transacao);
    }


    // Exclui uma transação e ESTORNA o valor na conta correta.
    @Transactional
    public void excluir(Long idTransacao) {
        Transacao transacao = transacaoRepository.findById(idTransacao)
                .orElseThrow(() -> new BusinessException("Transação com ID " + idTransacao + " não encontrada."));

        // Estorno de valor
        if ("SAIDA".equalsIgnoreCase(transacao.getTipo())) { // Se for uma SAIDA, devolver o valor a conta
            somarSaldo(transacao.getConta(), transacao.getValor());

        } else if ("ENTRADA".equalsIgnoreCase(transacao.getTipo())) { // Se for uma ENTRADA, subtrair o valor da conta.
            subtrairSaldo(transacao.getConta(), transacao.getValor());
        }

        transacaoRepository.delete(transacao);
    }


    @Transactional
    public Transacao atualizar(Long idTransacao, TransacaoDTO dto) {

        Transacao transacaoExistente = transacaoRepository.findById(idTransacao)
                .orElseThrow(() -> new BusinessException("Transação com ID " + idTransacao + " não encontrada."));


        BigDecimal valorAntigo = transacaoExistente.getValor();
        String tipoAntigo = transacaoExistente.getTipo();
        Conta contaAntiga = transacaoExistente.getConta();


        if ("SAIDA".equalsIgnoreCase(tipoAntigo)) {
            somarSaldo(contaAntiga, valorAntigo);
        } else if ("ENTRADA".equalsIgnoreCase(tipoAntigo)) {
            subtrairSaldo(contaAntiga, valorAntigo);
        }


        Conta contaParaAplicar = contaAntiga;
        if (!dto.getIdConta().equals(contaAntiga.getId())) {
            contaParaAplicar = contaRepository.findById(dto.getIdConta())
                    .orElseThrow(() -> new BusinessException("Nova conta com ID " + dto.getIdConta() + " não encontrada."));
        }

        Categoria categoriaParaAplicar = transacaoExistente.getCategoria();
        if (!dto.getIdCategoria().equals(categoriaParaAplicar.getPkIdCategoria())) {
            categoriaParaAplicar = categoriaRepository.findById(dto.getIdCategoria())
                    .orElseThrow(() -> new BusinessException("Nova categoria com ID " + dto.getIdCategoria() + " não encontrada."));
        }

        if ("SAIDA".equalsIgnoreCase(dto.getTipo())) {
            subtrairSaldo(contaParaAplicar, dto.getValor());
        } else if ("ENTRADA".equalsIgnoreCase(dto.getTipo())) {
            somarSaldo(contaParaAplicar, dto.getValor());
        }

        transacaoExistente.setConta(contaParaAplicar);
        transacaoExistente.setCategoria(categoriaParaAplicar);
        transacaoExistente.setTipo(dto.getTipo());
        transacaoExistente.setValor(dto.getValor());
        transacaoExistente.setDataTransacao(dto.getDataTransacao() != null ? dto.getDataTransacao() : LocalDate.now());

        return transacaoRepository.save(transacaoExistente);
    }


    // Método auxiliar para subtrair o saldo, descobrindo o tipo da conta
    private void subtrairSaldo(Conta conta, BigDecimal valor) {

        if (conta instanceof ContaFisica) {
            ContaFisica contaFisica = (ContaFisica) conta;
            BigDecimal novoSaldo = contaFisica.getSaldoAtual().subtract(valor);

            if (novoSaldo.compareTo(BigDecimal.ZERO) < 0) {
                throw new BusinessException("Saldo insuficiente na Conta Física.");
            }
            contaFisica.setSaldoAtual(novoSaldo);

        } else if (conta instanceof ContaJuridica) {
            ContaJuridica contaJuridica = (ContaJuridica) conta;
            BigDecimal novoSaldo = contaJuridica.getSaldoAtual().subtract(valor);
            if (novoSaldo.compareTo(BigDecimal.ZERO) < 0) {
                throw new BusinessException("Saldo insuficiente na Conta Jurídica.");
            }
            contaJuridica.setSaldoAtual(novoSaldo);

        } else {
            throw new IllegalStateException("Tipo de conta não reconhecido: " + conta.getId());
        }
    }

    // Método auxiliar para somar o saldo, descobrindo o tipo da conta.
    private void somarSaldo(Conta conta, BigDecimal valor) {
        if (conta instanceof ContaFisica) {
            ContaFisica contaFisica = (ContaFisica) conta;
            contaFisica.setSaldoAtual(contaFisica.getSaldoAtual().add(valor));
        } else if (conta instanceof ContaJuridica) {
            ContaJuridica contaJuridica = (ContaJuridica) conta;
            contaJuridica.setSaldoAtual(contaJuridica.getSaldoAtual().add(valor));
        } else {
            throw new IllegalStateException("Tipo de conta não reconhecido: " + conta.getId());
        }
    }


    public Transacao buscarPorId(Long id) {
        return transacaoRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Conta com ID " + id + " não encontrada."));
    }

    public List<Transacao> buscarTodos() {
        return transacaoRepository.findAll();

    }

}