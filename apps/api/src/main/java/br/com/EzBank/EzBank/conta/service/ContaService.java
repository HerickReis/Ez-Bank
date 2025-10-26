package br.com.EzBank.EzBank.conta.service;

import br.com.EzBank.EzBank.conta.dto.ContaDTO;
import br.com.EzBank.EzBank.conta.model.Conta;
import br.com.EzBank.EzBank.conta.repository.ContaRepository;
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
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Conta conta = new Conta();
        conta.setUsuario(usuario);
        conta.setSaldoAtual(dto.getSaldoAtual());

        return contaRepository.save(conta);
    }

    public Conta buscarPorId(Long id) {
        Optional<Conta> conta = contaRepository.findById(id);

        if (conta.isPresent()) {
            return conta.get();
        }
        throw new RuntimeException("Produto não encontrado");
    }


    public List<Conta> buscarTodos() {
        return contaRepository.findAll();
    }


    public void excluir(Long id) {
        contaRepository.deleteById(id);
    }


    public Conta atualizarComDTO(Long id, ContaDTO dto) {
        Conta contaExistente = contaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada"));

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        contaExistente.setUsuario(usuario);
        contaExistente.setSaldoAtual(dto.getSaldoAtual());

        return contaRepository.save(contaExistente);
    }

}

