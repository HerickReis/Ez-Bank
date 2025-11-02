package br.com.EzBank.EzBank.transacao.controller;

import br.com.EzBank.EzBank.dto.TransacaoDTO;
import br.com.EzBank.EzBank.dto.TransacaoResponseDTO;
import br.com.EzBank.EzBank.transacao.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacoes")
@CrossOrigin(origins = "http://localhost:3000")
public class TransacaoController {

    @Autowired
    private TransacaoService transacaoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<TransacaoResponseDTO> salvar(@RequestBody TransacaoDTO dto) {
        TransacaoResponseDTO response = transacaoService.salvar(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    @ResponseStatus (HttpStatus.OK)
    public ResponseEntity<TransacaoResponseDTO> buscarPoriD(@PathVariable Long id) {
        return ResponseEntity.ok(transacaoService.buscarPorId(id));
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<TransacaoResponseDTO>> buscarTodos() {
        return ResponseEntity.ok(transacaoService.buscarTodos());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        transacaoService.excluir(id);
    }

    @PutMapping("/{id}")

    public ResponseEntity<TransacaoResponseDTO> atualizar(@PathVariable Long id, @RequestBody TransacaoDTO dto) {

        TransacaoResponseDTO responseDTO = transacaoService.atualizar(id, dto);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/por-usuario/{usuarioId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<TransacaoResponseDTO>> buscarTransacoesDoUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(transacaoService.buscarPorUsuario(usuarioId));
    }
}
