package BackEnd.AdalaHub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class TestController {

    // Endpoint pour les requêtes GET
    @GetMapping
    public ResponseEntity<String> testGet() {
        return ResponseEntity.ok("✅ GET réussi !");
    }

    // Endpoint pour les requêtes POST
    @PostMapping
    public ResponseEntity<String> testPost() {
        return ResponseEntity.ok("✅ POST réussi !");
    }

    // Optionnel : Endpoint pour les requêtes PUT
    @PutMapping
    public ResponseEntity<String> testPut() {
        return ResponseEntity.ok("✅ PUT réussi !");
    }

    // Optionnel : Endpoint pour les requêtes DELETE
    @DeleteMapping
    public ResponseEntity<String> testDelete() {
        return ResponseEntity.ok("✅ DELETE réussi !");
    }
}
