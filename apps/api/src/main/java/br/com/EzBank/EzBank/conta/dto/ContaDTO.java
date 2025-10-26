package br.com.EzBank.EzBank.conta.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class ContaDTO {
    private Long usuarioId;
    private BigDecimal saldoAtual;

    @NotNull(message = "Id usuário obrigatório")
    public Long getUsuarioId() {
        return usuarioId;
    }

    @NotNull
    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public BigDecimal getSaldoAtual() {
        return saldoAtual;
    }

    public void setSaldoAtual(BigDecimal saldoAtual) {
        this.saldoAtual = saldoAtual;
    }
}

