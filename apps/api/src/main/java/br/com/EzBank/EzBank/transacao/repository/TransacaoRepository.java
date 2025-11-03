package br.com.EzBank.EzBank.transacao.repository;

import br.com.EzBank.EzBank.transacao.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    @Query("SELECT t FROM Transacao t JOIN FETCH t.conta c JOIN FETCH t.categoria cat")
    List<Transacao> findAllCompleto();

    @Query("SELECT t FROM Transacao t JOIN FETCH t.conta c JOIN FETCH t.categoria cat WHERE t.idTransacao = :id")
    Optional<Transacao> findByIdCompleto(Long id);

    @Query("SELECT t FROM Transacao t JOIN FETCH t.conta c JOIN FETCH t.categoria cat WHERE c.usuario.pkIdUsuario = :usuarioId ORDER BY t.dataTransacao DESC")
    List<Transacao> findAllCompletoByUsuarioId(Long usuarioId);
}
