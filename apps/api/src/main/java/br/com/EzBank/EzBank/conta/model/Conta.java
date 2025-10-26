package br.com.EzBank.EzBank.conta.model;

import br.com.EzBank.EzBank.usuario.model.Usuario;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "t_conta")
@Inheritance(strategy = InheritanceType.JOINED) // Define uma estratégia de herança unindo as tabelas por id
@DiscriminatorColumn(name = "tp_conta") // Coluna que identifica o tipo de conta (Fisica / Juridica)
public class Conta {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "SEQ_CONTA"
    )
    @SequenceGenerator(
            name = "SEQ_CONTA",
            sequenceName = "SEQ_CONTA",
            allocationSize = 1
    )
    @Column(name = "pk_id_conta", length = 38)
    private Long id;

    @ManyToOne(optional = false) // Indica que a relação da Fk é muitos para um
    @JoinColumn(name = "fk_id_usuario", nullable = false,
            foreignKey = @ForeignKey(name = "fk_conta_usuario"))  // Apenas nomeia a constraint no banco
    @JsonBackReference // Indica que o objeto tem uma lista de filhos, entoa ele inclui na lista
    private Usuario usuario;

    @Column(name = "vl_saldo_atual", nullable = false, precision = 10, scale = 2)
    private BigDecimal saldoAtual;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public BigDecimal getSaldoAtual() {
        return saldoAtual;
    }

    public void setSaldoAtual(BigDecimal saldoAtual) {
        this.saldoAtual = saldoAtual;
    }
}
