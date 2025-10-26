package br.com.EzBank.EzBank.categorias.service;

import br.com.EzBank.EzBank.categorias.model.Categoria;
import br.com.EzBank.EzBank.categorias.repository.RepositoryCategoria;
import br.com.EzBank.EzBank.exceptions.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private RepositoryCategoria categoriaRepository;

    public Categoria salvar(Categoria categoria) {
        if (categoriaRepository.findByNmCategoria(categoria.getNmCategoria()).isPresent()) {
            throw new BusinessException("UNIQUE Constraint: Categoria com mesmo nome existente");
        } else {
            return categoriaRepository.save(categoria);
        }

    }

    public Categoria buscaPorId(Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);

        if (categoria.isPresent()) {
            return categoria.get();
        } else {
            throw new RuntimeException("Categoria inexistente");
        }
    }

    public List<Categoria> buscarTudo() {
        return categoriaRepository.findAll();
    }

    public void excluir(Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);

        if (categoria.isPresent()) {
            categoriaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Categoria inexistente");
        }
    }

    public Categoria atualizar(Long id, Categoria categoria) {
        Optional<Categoria> categoriaExistente = categoriaRepository.findById(id);

        if (categoriaExistente.isPresent()) {
            return categoriaRepository.save(categoria);
        } else {
            throw new RuntimeException("Categoria inexistente");
        }
    }

}
