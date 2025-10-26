package br.com.EzBank.EzBank.usuario.service;

import br.com.EzBank.EzBank.exceptions.BusinessException;
import br.com.EzBank.EzBank.exceptions.UserNotFoundException;
import br.com.EzBank.EzBank.usuario.model.Usuario;
import br.com.EzBank.EzBank.usuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {


    @Autowired
    private UsuarioRepository usuarioRepository;


    public Usuario salvar(Usuario usuario){
        Optional<Usuario> usuarioExistente = usuarioRepository.findByDsEmail(usuario.getDsEmail());

        if (usuarioExistente.isPresent()) {
            throw new BusinessException("UNIQUE CONSTRAINT: Email já cadastrado");
        }

        return usuarioRepository.save(usuario);
    }


    public Usuario buscarPorId(Long id){
        Optional<Usuario> usuario = usuarioRepository.findById(id);

        if (usuario.isPresent()) {
            return usuario.get();
        }

        throw new UserNotFoundException("Usuario não encontrado");
    }


    public List<Usuario> buscarTodos(){
        return usuarioRepository.findAll();
    }


    public void excluir(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);

        if (usuario.isPresent()) {
            usuarioRepository.deleteById(id);
        }
    }


    public Usuario atualizar(Long id, Usuario usuario){
        Optional<Usuario> usuarioAtual = usuarioRepository.findById(id);

        if (usuarioAtual.isPresent()) {
            return usuarioRepository.save(usuario);
        }

        throw new UserNotFoundException("Usuário não encontrado");

    }

}
