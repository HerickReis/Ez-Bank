package br.com.EzBank.EzBank.conta.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "t_conta_fisica")
@DiscriminatorValue("fisica")
public class ContaFisica extends Conta{

    @Column(name = "nr_cpf", length = 11, nullable = false, unique = true)
    private String cpf;

    @Column(name = "vl_saldo_atual", nullable = false, precision = 10, scale = 2)
    private BigDecimal saldoAtual;

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public BigDecimal getSaldoAtual() {
        return saldoAtual;
    }

    public void setSaldoAtual(BigDecimal saldoAtual) {
        this.saldoAtual = saldoAtual;
    }
}
