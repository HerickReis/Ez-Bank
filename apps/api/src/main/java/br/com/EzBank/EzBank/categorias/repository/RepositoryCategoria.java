package br.com.EzBank.EzBank.categorias.repository;

import br.com.EzBank.EzBank.categorias.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepositoryCategoria extends JpaRepository<Categoria, Long> {
    Optional<Categoria> findByNmCategoria(String nmCategoria);
}
