package br.com.EzBank.EzBank.transacao.repository;

import br.com.EzBank.EzBank.transacao.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
}
