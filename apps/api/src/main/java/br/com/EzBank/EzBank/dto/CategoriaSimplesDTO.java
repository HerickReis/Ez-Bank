package br.com.EzBank.EzBank.dto;

import br.com.EzBank.EzBank.categorias.model.Categoria;

public class CategoriaSimplesDTO {

    private Long id;
    private String nome;

    public CategoriaSimplesDTO(Categoria categoria) {
        this.id = categoria.getPkIdCategoria();
        this.nome = categoria.getNmCategoria();
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }
}