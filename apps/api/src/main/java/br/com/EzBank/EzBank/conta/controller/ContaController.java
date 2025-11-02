package br.com.EzBank.EzBank.conta.controller;

import br.com.EzBank.EzBank.dto.ContaDTO;
import br.com.EzBank.EzBank.conta.model.Conta;
import br.com.EzBank.EzBank.conta.service.ContaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contas")
@CrossOrigin(origins = "http://localhost:3000")
public class ContaController {

    @Autowired
    private ContaService contaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Conta salvar(@RequestBody ContaDTO dto){
        return contaService.salvarComDTO(dto);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Conta buscarPorId(@PathVariable Long id){
        return contaService.buscarPorId(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Conta> buscarTodos(){
        return contaService.buscarTodos();

    }

    @GetMapping("/por-usuario/{usuarioId}")
    @ResponseStatus(HttpStatus.OK)
    public List<Conta> buscarContasDoUsuario(@PathVariable Long usuarioId){
        return contaService.buscarPorUsuario(usuarioId);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id){
        contaService.excluir(id);
    }

    @PutMapping("/{id}")
    public Conta atualizar(@PathVariable Long id, @RequestBody ContaDTO dto) {
        return contaService.atualizarComDTO(id, dto);
    }

}

