package BackEnd.AdalaHub.controller;

import BackEnd.AdalaHub.model.RendezVous;
import BackEnd.AdalaHub.service.RendezVousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;


@RestController
@RequestMapping("/api/rendezvous")
public class RendezVousController {

    private final RendezVousService rendezVousService;

    @Autowired
    public RendezVousController(RendezVousService rendezVousService) {
        this.rendezVousService = rendezVousService;
    }

    @PostMapping
    public ResponseEntity<?> createRendezVous(
            @RequestParam Long avocatId,
            @RequestParam Long clientId,
            @RequestParam String motif,
            @RequestParam String dateHeure) {

        try {
            LocalDateTime dateTime = LocalDateTime.parse(dateHeure);
            RendezVous saved = rendezVousService.createRendezVous(avocatId, clientId, motif, dateTime);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Format de date invalide. Utilisez : yyyy-MM-ddTHH:mm");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erreur interne : " + e.getMessage());
        }
    }

    @GetMapping("/avocat/{avocatId}")
    public ResponseEntity<List<RendezVous>> getRendezVousByAvocat(@PathVariable Long avocatId) {
        return ResponseEntity.ok(rendezVousService.getRendezVousByAvocat(avocatId));
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<RendezVous>> getRendezVousByClient(@PathVariable Long clientId) {
        return ResponseEntity.ok(rendezVousService.getRendezVousByClient(clientId));
    }
}