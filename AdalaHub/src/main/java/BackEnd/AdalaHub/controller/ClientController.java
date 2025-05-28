package BackEnd.AdalaHub.controller;

import BackEnd.AdalaHub.model.Client;
import BackEnd.AdalaHub.model.RendezVous;
import BackEnd.AdalaHub.service.ClientService;
import BackEnd.AdalaHub.service.RendezVousService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private RendezVousService rendezVousService;

    @PostMapping
    public Client createClient(@RequestBody Client client) {
        return clientService.saveClient(client);
    }

    @GetMapping
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @GetMapping("/{id}")
    public Optional<Client> getClient(@PathVariable Long id) {
        return clientService.getClientById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
    }

    @PostMapping("/{clientId}/rendezvous/{avocatId}")
    public RendezVous prendreRendezVous(
            @PathVariable Long clientId,
            @PathVariable Long avocatId,
            @RequestParam String date,
            @RequestParam(defaultValue = "Consultation") String motif) {

        LocalDateTime dateHeure = LocalDateTime.parse(date);
        return rendezVousService.createRendezVous(avocatId, clientId, motif, dateHeure);
    }
}
