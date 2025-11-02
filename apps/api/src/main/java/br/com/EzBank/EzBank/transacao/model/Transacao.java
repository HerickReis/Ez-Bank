package br.com.EzBank.EzBank.transacao.model;

import br.com.EzBank.EzBank.categorias.model.Categoria;
import br.com.EzBank.EzBank.conta.model.Conta;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "t_transacao")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Transacao {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "SEQ_TRANSACAO"
    )
    @SequenceGenerator(
            name = "SEQ_TRANSACAO",
            sequenceName = "SEQ_TRANSACAO",
            allocationSize = 1
    )
    @Column(name = "pk_id_transacao")
    private Long idTransacao;

    // Muitas transações são de uma conta.
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_conta", nullable = false,
                    foreignKey = @ForeignKey(name = "fk_transacao_conta"))
    @JsonBackReference
    private Conta conta;

    // Muitas tansações são de uma categoria
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_categoria",
                foreignKey = @ForeignKey(name = "fk_transacao_categoria"))
    private Categoria categoria;


    @Column(name = "dt_data_movimentacao")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataTransacao;

    @Column(name = "ds_tipo", length = 15)
    private String tipo;

    @Column(name = "vl_valor", precision = 10, scale = 2)
    private BigDecimal valor;

    public Long getIdTransacao() {
        return idTransacao;
    }

    public void setIdTransacao(Long idTransacao) {
        this.idTransacao = idTransacao;
    }

    public Conta getConta() {
        return conta;
    }

    public void setConta(Conta conta) {
        this.conta = conta;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
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
