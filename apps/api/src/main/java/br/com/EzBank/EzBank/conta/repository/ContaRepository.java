package br.com.EzBank.EzBank.conta.repository;

import br.com.EzBank.EzBank.conta.model.Conta;
import br.com.EzBank.EzBank.conta.model.ContaFisica;
import br.com.EzBank.EzBank.conta.model.ContaJuridica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContaRepository extends JpaRepository<Conta, Long> {
}
