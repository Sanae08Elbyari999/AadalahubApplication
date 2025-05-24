package BackEnd.AdalaHub.controller;

import BackEnd.AdalaHub.model.AvocatDetails;
import BackEnd.AdalaHub.repository.AvocatDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


import BackEnd.AdalaHub.model.AvocatDetails;
import BackEnd.AdalaHub.repository.AvocatDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AvocatController {

    @Autowired
    private AvocatDetailsRepository avocatDetailsRepository;

    // Endpoint de test (GET /api)
    @GetMapping
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("API AvocatDetails est opérationnelle");
    }

    // Endpoint pour tester GET avec URL /api/avocat_details
    @GetMapping("/avocat_details")
    public ResponseEntity<String> getMessage() {
        return ResponseEntity.ok("GET /avocat_details réussi");
    }

    // Endpoint POST pour ajouter un avocat
    @PostMapping("/avocat_details")
    public ResponseEntity<AvocatDetails> createAvocat(@RequestBody AvocatDetails avocatDetails) {
        AvocatDetails savedAvocat = avocatDetailsRepository.save(avocatDetails);
        return ResponseEntity.ok(savedAvocat);
    }
}
