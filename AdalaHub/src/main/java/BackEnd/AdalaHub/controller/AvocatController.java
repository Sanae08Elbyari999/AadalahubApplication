package BackEnd.AdalaHub.controller;

import BackEnd.AdalaHub.model.AvocatDetails;
import BackEnd.AdalaHub.repository.AvocatDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/avocat_details")
public class AvocatController {

    @Autowired
    private AvocatDetailsRepository avocatDetailsRepository;

    // Récupérer tous les avocats
    @GetMapping
    public ResponseEntity<List<AvocatDetails>> getAllAvocats() {
        List<AvocatDetails> avocats = avocatDetailsRepository.findAll();
        return ResponseEntity.ok(avocats);
    }

    // Récupérer un avocat par son ID
    @GetMapping("/{id}")
    public ResponseEntity<AvocatDetails> getAvocatById(@PathVariable Long id) {
        Optional<AvocatDetails> avocat = avocatDetailsRepository.findById(id);
        return avocat.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Créer un nouvel avocat
    @PostMapping
    public ResponseEntity<AvocatDetails> createAvocat(@RequestBody AvocatDetails avocatDetails) {
        AvocatDetails savedAvocat = avocatDetailsRepository.save(avocatDetails);
        return ResponseEntity.ok(savedAvocat);
    }
}
