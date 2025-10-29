package br.com.EzBank.EzBank.transacao.controller;

import br.com.EzBank.EzBank.dto.TransacaoDTO;
import br.com.EzBank.EzBank.transacao.model.Transacao;
import br.com.EzBank.EzBank.transacao.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacoes")
public class TransacaoController {

    @Autowired
    private TransacaoService transacaoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Transacao salvar(@RequestBody TransacaoDTO dto) {
        return transacaoService.salvar(dto);
    }

    @GetMapping("/{id}")
    @ResponseStatus (HttpStatus.OK)
    public Transacao buscar(@PathVariable Long id) {
        return transacaoService.buscarPorId(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Transacao> buscarTodos() {
        return transacaoService.buscarTodos();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id) {
        transacaoService.excluir(id);
    }

    @PutMapping("/{id}")
    public Transacao atualizar(@PathVariable Long id, TransacaoDTO dto) {
        return transacaoService.atualizar(id, dto);
    }
}
