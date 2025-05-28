package BackEnd.AdalaHub.service;

import BackEnd.AdalaHub.model.AvocatDetails;
import BackEnd.AdalaHub.model.Client;
import BackEnd.AdalaHub.model.RendezVous;
import BackEnd.AdalaHub.repository.AvocatDetailsRepository;
import BackEnd.AdalaHub.repository.ClientRepository;
import BackEnd.AdalaHub.repository.RendezVousRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RendezVousService {

    private final RendezVousRepository rendezVousRepository;
    private final AvocatDetailsRepository avocatDetailsRepository;
    private final ClientRepository clientRepository;


    @Autowired
    public RendezVousService(RendezVousRepository rendezVousRepository,
                             AvocatDetailsRepository avocatDetailsRepository,
                             ClientRepository clientRepository) {
        this.rendezVousRepository = rendezVousRepository;
        this.avocatDetailsRepository = avocatDetailsRepository;
        this.clientRepository = clientRepository;
    }

    public RendezVous createRendezVous(Long avocatId, Long clientId, String motif, LocalDateTime dateHeure) {
        AvocatDetails avocat = avocatDetailsRepository.findById(avocatId)
                .orElseThrow(() -> new IllegalArgumentException("Avocat non trouvé"));

        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client non trouvé"));

        if (dateHeure.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("La date doit être dans le futur");
        }

        if (rendezVousRepository.existsByAvocatIdAndDateHeure(avocatId, dateHeure)) {
            throw new IllegalStateException("L'avocat n'est pas disponible à cette heure");
        }

        RendezVous rendezVous = new RendezVous(avocat, client, motif, dateHeure);
        return rendezVousRepository.save(rendezVous);
    }

    public List<RendezVous> getRendezVousByAvocat(Long avocatId) {
        return rendezVousRepository.findByAvocatId(avocatId);
    }

    public List<RendezVous> getRendezVousByClient(Long clientId) {
        return rendezVousRepository.findByClient_Id(clientId);
    }
}