package br.com.EzBank.EzBank.conta.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "t_conta_juridica")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ContaJuridica extends Conta{

    @Column(name = "nr_cnpj", length = 14, nullable = false, unique = true)
    private String cnpj;

    @Column(name = "ds_razao_social", length = 100, nullable = false)
    private String razaoSocial;

    @Column(name = "vl_saldo_atual", nullable = false, precision = 10, scale = 2)
    private BigDecimal saldoAtual;

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public BigDecimal getSaldoAtual() {
        return saldoAtual;
    }

    public void setSaldoAtual(BigDecimal saldoAtual) {
        this.saldoAtual = saldoAtual;
    }
}
