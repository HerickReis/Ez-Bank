package br.com.EzBank.EzBank.dto;

import br.com.EzBank.EzBank.conta.model.Conta;
import br.com.EzBank.EzBank.conta.model.ContaFisica;
import br.com.EzBank.EzBank.conta.model.ContaJuridica;
import java.math.BigDecimal;

public class ContaSimplesDTO {

    private Long id;
    private String tipo; // "FISICA" ou "JURIDICA"
    private BigDecimal saldoAtual;
    private String documento; // CPF ou CNPJ

    public ContaSimplesDTO(Conta conta) {
        this.id = conta.getId();

        if (conta instanceof ContaFisica) {
            ContaFisica cf = (ContaFisica) conta;
            this.tipo = "FISICA";
            this.saldoAtual = cf.getSaldoAtual();
            this.documento = cf.getCpf();
        } else if (conta instanceof ContaJuridica) {
            ContaJuridica cj = (ContaJuridica) conta;
            this.tipo = "JURIDICA";
            this.saldoAtual = cj.getSaldoAtual();
            this.documento = cj.getCnpj();
        }
    }

    public Long getId() {
        return id;
    }

    public String getTipo() {
        return tipo;
    }

    public BigDecimal getSaldoAtual() {
        return saldoAtual;
    }

    public String getDocumento() {
        return documento;
    }
}