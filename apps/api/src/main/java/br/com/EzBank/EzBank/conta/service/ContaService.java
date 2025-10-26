package br.com.EzBank.EzBank.conta.service;

import br.com.EzBank.EzBank.conta.dto.ContaDTO;
import br.com.EzBank.EzBank.conta.model.Conta;
import br.com.EzBank.EzBank.conta.model.ContaFisica;
import br.com.EzBank.EzBank.conta.model.ContaJuridica;
import br.com.EzBank.EzBank.conta.repository.ContaRepository;
import br.com.EzBank.EzBank.exceptions.BusinessException;
import br.com.EzBank.EzBank.exceptions.UserNotFoundException;
import br.com.EzBank.EzBank.usuario.model.Usuario;
import br.com.EzBank.EzBank.usuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContaService {

    @Autowired
    private ContaRepository contaRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;


    public Conta salvarComDTO(ContaDTO dto) {
        if (dto.getUsuarioId() == null) {
            throw new RuntimeException("ID do usuário não fornecido");
        }

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new UserNotFoundException("Usuário não cadastrado"));

        boolean jaPossuiFisica = false;
        boolean jaPossuiJuridica = false;

        for (Conta contaExistente : usuario.getContas()) {
            if (contaExistente instanceof ContaFisica) {
                jaPossuiFisica = true;
            } else if (contaExistente instanceof ContaJuridica) {
                jaPossuiJuridica = true;
            }
        }

        Conta contaParaSalvar; // Usa a classe Conta abstrata

        if ("FISICA".equalsIgnoreCase(dto.getTipoConta())) {

            if (jaPossuiFisica) {
                throw new BusinessException("Usuário já possui uma conta física");
            }

            if (dto.getCpf() == null || dto.getCpf().isBlank()) {
                throw new BusinessException("CPF é obrigatório para Conta Física");
            }
            ContaFisica contaFisica = new ContaFisica();
            contaFisica.setCpf(dto.getCpf());

            contaFisica.setSaldoAtual(dto.getSaldoAtual());

            contaParaSalvar = contaFisica; // atribui conta fisica ao Objeto pai

        } else if ("JURIDICA".equalsIgnoreCase(dto.getTipoConta())) {

            if (jaPossuiJuridica) {
                throw new BusinessException("Usuário já possui uma conta jurídica");
            }

            if (dto.getCnpj() == null || dto.getCnpj().isBlank()) {
                throw new BusinessException("CNPJ é obrigatório para Conta Jurídica");
            }
            if (dto.getRazaoSocial() == null || dto.getRazaoSocial().isBlank()) {
                throw new BusinessException("Razão Social é obrigatório para Conta Jurídica");
            }

            ContaJuridica contaJuridica = new ContaJuridica();
            contaJuridica.setCnpj(dto.getCnpj());

            contaJuridica.setSaldoAtual(dto.getSaldoAtual());

            contaJuridica.setRazaoSocial(dto.getRazaoSocial());
            contaParaSalvar = contaJuridica;
        } else {
            throw new BusinessException("Tipo de conta inválido. Use 'FISICA' ou 'JURIDICA'.");
        }

        // Define os atributos comuns da classe-pau Conta
        contaParaSalvar.setUsuario(usuario);

        return contaRepository.save(contaParaSalvar);
    }


    public Conta buscarPorId(Long id) {
        Optional<Conta> conta = contaRepository.findById(id);

        if (conta.isPresent()) {
            return conta.get();
        }
        throw new UserNotFoundException("Conta não encontrada");
    }


    public List<Conta> buscarTodos() {
        return contaRepository.findAll();
    }


    public void excluir(Long id) {
        contaRepository.deleteById(id);
    }


    public Conta atualizarComDTO(Long id, ContaDTO dto) {
        Conta contaExistente = contaRepository.findById(id).orElseThrow(()
                -> new BusinessException("A conta indicada não foi encontrada"));

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId()).orElseThrow(()
                -> new UserNotFoundException("Usuário não encontrado"));

        contaExistente.setUsuario(usuario); // Seta o usuário diretamente pelo DTO

        if (contaExistente instanceof ContaFisica){
            ContaFisica contaFisica = (ContaFisica) contaExistente;
            contaFisica.setCpf(dto.getCpf()); // Atualiza o CPF

            contaFisica.setSaldoAtual(dto.getSaldoAtual());

        } else if (contaExistente instanceof ContaJuridica){
            ContaJuridica contaJuridica = (ContaJuridica) contaExistente;
            contaJuridica.setCnpj(dto.getCnpj()); // Atualiza o CNPJ
            contaJuridica.setRazaoSocial(dto.getRazaoSocial()); // Atualiza a Razão Social

            contaJuridica.setSaldoAtual(dto.getSaldoAtual());
        }

        return contaRepository.save(contaExistente);
    }

}
