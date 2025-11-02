package br.com.EzBank.EzBank.categorias.controller;

import br.com.EzBank.EzBank.categorias.model.Categoria;
import br.com.EzBank.EzBank.categorias.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Categoria criar(@RequestBody Categoria categoria){
        return categoriaService.salvar(categoria);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Categoria buscarPorId(@PathVariable Long id) {
        return categoriaService.buscaPorId(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Categoria> buscarTudo() {
        return categoriaService.buscarTudo();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void excluir(@PathVariable Long id){
        categoriaService.excluir(id);
    }

    @PutMapping("/{id}")
    public Categoria atualizar(@PathVariable Long id, @RequestBody Categoria categoria){
        return categoriaService.atualizar(id, categoria);
    }
}
