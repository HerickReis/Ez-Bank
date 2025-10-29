package br.com.EzBank.EzBank.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class ContaDTO {

    @NotNull(message = "Id usuário obrigatório")
    private Long usuarioId;

    @NotNull(message = "Saldo inicial obrigatório")
    private BigDecimal saldoAtual;

    @NotNull(message = "Tipo de conta é obrigatório (Fisica ou Juridica)")
    private  String tipoConta; // Tipo de cnta fisica ou jurdica

    private String cpf;

    private String cnpj;
    private String razaoSocial;


    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public BigDecimal getSaldoAtual() {
        return saldoAtual;
    }

    public void setSaldoAtual(BigDecimal saldoAtual) {
        this.saldoAtual = saldoAtual;
    }

    public String getTipoConta() {
        return tipoConta;
    }

    public void setTipoConta(String tipoConta) {
        this.tipoConta = tipoConta;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

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
}

