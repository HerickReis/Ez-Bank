package br.com.EzBank.EzBank.conta.repository;

import br.com.EzBank.EzBank.conta.model.Conta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContaRepository extends JpaRepository<Conta, Long> {
}
