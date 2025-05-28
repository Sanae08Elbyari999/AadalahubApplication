package BackEnd.AdalaHub.controller;

import BackEnd.AdalaHub.model.AvocatDetails;
import BackEnd.AdalaHub.model.Client;
import BackEnd.AdalaHub.model.RendezVous;
import BackEnd.AdalaHub.repository.AvocatDetailsRepository;
import BackEnd.AdalaHub.repository.ClientRepository;
import BackEnd.AdalaHub.repository.RendezVousRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class RendezVousControllerTest {

    @InjectMocks
    private RendezVousController rendezVousController;

    @Mock
    private RendezVousRepository rendezVousRepository;

    @Mock
    private AvocatDetailsRepository avocatDetailsRepository;

    @Mock
    private ClientRepository clientRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateRendezVous_Success() {
        Long avocatId = 1L;
        Long clientId = 2L;
        String motif = "Consultation";
        String dateHeure = "2025-06-10T10:00";

        AvocatDetails avocat = new AvocatDetails();
        Client client = new Client();
        LocalDateTime dateTime = LocalDateTime.parse(dateHeure);
        RendezVous rendezVous = new RendezVous(avocat, client, motif, dateTime);

        when(avocatDetailsRepository.findById(avocatId)).thenReturn(Optional.of(avocat));
        when(clientRepository.findById(clientId)).thenReturn(Optional.of(client));
        when(rendezVousRepository.existsByAvocatIdAndDateHeure(avocatId, dateTime)).thenReturn(false);
        when(rendezVousRepository.save(any(RendezVous.class))).thenReturn(rendezVous);

        ResponseEntity<?> response = rendezVousController.createRendezVous(avocatId, clientId, motif, dateHeure);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(rendezVous, response.getBody());
    }

    @Test
    void testCreateRendezVous_AvocatNotFound() {
        when(avocatDetailsRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = rendezVousController.createRendezVous(1L, 2L, "motif", "2025-06-10T10:00");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Avocat non trouvé", response.getBody());
    }

    @Test
    void testCreateRendezVous_ClientNotFound() {
        AvocatDetails avocat = new AvocatDetails();
        when(avocatDetailsRepository.findById(1L)).thenReturn(Optional.of(avocat));
        when(clientRepository.findById(2L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = rendezVousController.createRendezVous(1L, 2L, "motif", "2025-06-10T10:00");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Client non trouvé", response.getBody());
    }

    @Test
    void testCreateRendezVous_DateOccupied() {
        AvocatDetails avocat = new AvocatDetails();
        Client client = new Client();
        LocalDateTime dateTime = LocalDateTime.parse("2025-06-10T10:00");

        when(avocatDetailsRepository.findById(1L)).thenReturn(Optional.of(avocat));
        when(clientRepository.findById(2L)).thenReturn(Optional.of(client));
        when(rendezVousRepository.existsByAvocatIdAndDateHeure(1L, dateTime)).thenReturn(true);

        ResponseEntity<?> response = rendezVousController.createRendezVous(1L, 2L, "motif", "2025-06-10T10:00");

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("L'avocat n'est pas disponible à cette heure", response.getBody());
    }

    @Test
    void testCreateRendezVous_InvalidDate() {
        Long avocatId = 1L;
        Long clientId = 2L;
        String motif = "Consultation";
        String invalidDate = "invalid-date";
        ResponseEntity<?> response = rendezVousController.createRendezVous(
                avocatId,
                clientId,
                motif,
                invalidDate
        );
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Format de date invalide. Utilisez : yyyy-MM-ddTHH:mm", response.getBody());
    }

    @Test
    void testGetRendezVousByAvocat() {
        Long avocatId = 1L;
        List<RendezVous> list = List.of(new RendezVous());

        when(rendezVousRepository.findByAvocatId(avocatId)).thenReturn(list);

        ResponseEntity<List<RendezVous>> response = (ResponseEntity<List<RendezVous>>) rendezVousController.getRendezVousByAvocat(avocatId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(list, response.getBody());
    }

    @Test
    void testGetRendezVousByClient() {
        Long clientId = 1L;
        List<RendezVous> list = List.of(new RendezVous());

        when(rendezVousRepository.findByClient_Id(clientId)).thenReturn(list);

        ResponseEntity<List<RendezVous>> response = (ResponseEntity<List<RendezVous>>) rendezVousController.getRendezVousByClient(clientId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(list, response.getBody());
    }
}
