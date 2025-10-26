package br.com.EzBank.EzBank.usuario.model;

import br.com.EzBank.EzBank.conta.model.Conta;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_usuario",
        uniqueConstraints = @UniqueConstraint(columnNames = "ds_email"))
public class Usuario {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "SEQ_USUARIO"
    )
    @SequenceGenerator(
            name = "SEQ_USUARIO",
            sequenceName = "SEQ_USUARIO",
            allocationSize = 1

    )

    @Column(name = "pk_id_usuario", nullable = false)
    private Long pkIdUsuario;

    @Column(name = "nm_usuario", nullable = false, length = 50)
    private String nmUsuario;

    @Column(name = "ds_email", nullable = false, length = 100)
    private String dsEmail;

    @Column(name = "dt_nascimento", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") // Formata a entrada da data
    private LocalDate dtNascimento;

    @Column(name = "vl_renda_mensal", nullable = false, precision = 10, scale = 2)
    private BigDecimal vlRendaMensal;

    @Column(name = "tx_senha", nullable = false, length = 100)
    private String txSenha;

    @OneToMany(mappedBy = "usuario", // Indica que a fk está no atributo usuario da classe Conta
            cascade = CascadeType.ALL,
            orphanRemoval = true)// Se uma conta for removida da lista, ela é deletada do banco)
    @JsonManagedReference // Indica o lado filho, entao ele não inclui na lista
    private List<Conta> contas = new ArrayList<>();

    public Long getPkIdUsuario() {
        return pkIdUsuario;
    }

    public void setPkIdUsuario(Long pkIdUsuario) {
        this.pkIdUsuario = pkIdUsuario;
    }

    public String getNmUsuario() {
        return nmUsuario;
    }

    public void setNmUsuario(String nmUsuario) {
        this.nmUsuario = nmUsuario;
    }

    public String getDsEmail() {
        return dsEmail;
    }

    public void setDsEmail(String dsEmail) {
        this.dsEmail = dsEmail;
    }

    public LocalDate getDtNascimento() {
        return dtNascimento;
    }

    public void setDtNascimento(LocalDate dtNascimento) {
        this.dtNascimento = dtNascimento;
    }

    public BigDecimal getVlRendaMensal() {
        return vlRendaMensal;
    }

    public void setVlRendaMensal(BigDecimal vlRendaMensal) {
        this.vlRendaMensal = vlRendaMensal;
    }

    public String getTxSenha() {
        return txSenha;
    }

    public void setTxSenha(String txSenha) {
        this.txSenha = txSenha;
    }

    public List<Conta> getContas() {
        return contas;
    }

    public void setContas(List<Conta> contas) {
        this.contas = contas;
    }
}
