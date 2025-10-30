package br.com.EzBank.EzBank.dto;

import br.com.EzBank.EzBank.transacao.model.Transacao; // Você precisará criar esta entidade
import java.math.BigDecimal;
import java.time.LocalDate;

public class TransacaoResponseDTO {
    private Long idTransacao;
    private LocalDate dataTransacao;
    private String tipo;
    private BigDecimal valor;

    // As partes importantes:
    private ContaSimplesDTO conta;
    private CategoriaSimplesDTO categoria;

    // Construtor que recebe a Entidade e a "traduz"
    public TransacaoResponseDTO(Transacao transacao) {
        this.idTransacao = transacao.getIdTransacao();
        this.dataTransacao = transacao.getDataTransacao();
        this.tipo = transacao.getTipo();
        this.valor = transacao.getValor();

        // Aqui ele usa os outros DTOs simples para quebrar o loop
        this.conta = new ContaSimplesDTO(transacao.getConta());
        this.categoria = new CategoriaSimplesDTO(transacao.getCategoria());
    }

    public Long getIdTransacao() {
        return idTransacao;
    }

    public void setIdTransacao(Long idTransacao) {
        this.idTransacao = idTransacao;
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

    public ContaSimplesDTO getConta() {
        return conta;
    }

    public void setConta(ContaSimplesDTO conta) {
        this.conta = conta;
    }

    public CategoriaSimplesDTO getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaSimplesDTO categoria) {
        this.categoria = categoria;
    }
}
