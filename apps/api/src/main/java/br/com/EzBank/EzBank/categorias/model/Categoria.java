package br.com.EzBank.EzBank.categorias.model;

import jakarta.persistence.*;


@Entity
@Table(name = "t_categoria",
        uniqueConstraints = @UniqueConstraint(columnNames = {"fk_id_usuario", "nm_categoria"}))
public class Categoria {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "SEQ_CATEGORIA"
    )

    @SequenceGenerator(
            name = "SEQ_CATEGORIA",
            sequenceName = "SEQ_CATEGORIA",
            allocationSize = 1
    )
    @Column(name = "pk_id_categoria")
    private Long pkIdCategoria;

    @Column(name = "nm_categoria" , length = 30, nullable = false)
    private String nmCategoria;


    public Long getPkIdCategoria() {
        return pkIdCategoria;
    }

    public void setPkIdCategoria(Long pkIdCategoria) {
        this.pkIdCategoria = pkIdCategoria;
    }

    public String getNmCategoria() {
        return nmCategoria;
    }

    public void setNmCategoria(String nmCategoria) {
        this.nmCategoria = nmCategoria;
    }
}
