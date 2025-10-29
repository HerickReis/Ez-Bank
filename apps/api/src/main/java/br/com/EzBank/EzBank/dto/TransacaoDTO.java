package br.com.EzBank.EzBank.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransacaoDTO {

    @NotNull(message = "O ID da conta é obrigatório")
    private Long idConta;

    @NotNull(message = "O ID da categoria é obrigatório")
    private Long idCategoria;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataTransacao;

    @NotBlank(message = "O tipo é obrigatório (ex: ENTRADA, SAIDA)")
    private String tipo;

    @NotNull(message = "O valor da transação é obrigatório")
    @Positive(message = "O valor da transação deve ser positivo")
    private BigDecimal valor;

    public Long getIdConta() {
        return idConta;
    }

    public void setIdConta(Long idConta) {
        this.idConta = idConta;
    }

    public Long getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idCategoria = idCategoria;
    }

    public LocalDate getDataTransacao() {
        return dataTransacao;
    }

    public void setDataTransacao(LocalDate dataTransacao) {
        this.dataTransacao = dataTransacao;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
}

