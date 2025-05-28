package BackEnd.AdalaHub.controller;

import BackEnd.AdalaHub.model.Client;
import BackEnd.AdalaHub.model.RendezVous;
import BackEnd.AdalaHub.service.ClientService;
import BackEnd.AdalaHub.service.RendezVousService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(ClientController.class)
public class ClientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClientService clientService;

    @MockBean
    private RendezVousService rendezVousService;

    private Client client;
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        client = new Client();
        client.setId(1L);
        client.setNom("Sanae");
        client.setPrenom("Test");
        objectMapper = new ObjectMapper();
    }

    @Test
    public void testCreateClient() throws Exception {
        when(clientService.saveClient(Mockito.any(Client.class))).thenReturn(client);

        mockMvc.perform(post("/api/clients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(client)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nom").value("Sanae"));
    }

    @Test
    public void testGetAllClients() throws Exception {
        List<Client> clients = Arrays.asList(client);
        when(clientService.getAllClients()).thenReturn(clients);

        mockMvc.perform(get("/api/clients"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nom").value("Sanae"));
    }

    @Test
    public void testGetClient() throws Exception {
        when(clientService.getClientById(1L)).thenReturn(client);

        mockMvc.perform(get("/api/clients/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.prenom").value("Test"));
    }

    @Test
    public void testDeleteClient() throws Exception {
        doNothing().when(clientService).deleteClient(1L);

        mockMvc.perform(delete("/api/clients/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void testPrendreRendezVous() throws Exception {
        RendezVous rendezVous = new RendezVous();
        rendezVous.setMotif("Consultation");

        Client mockClient = new Client();
        mockClient.setId(1L);
        mockClient.setNom("Sanae");

        rendezVous.setClient(mockClient);  // ← essentiel !

        LocalDateTime date = LocalDateTime.of(2025, 6, 1, 10, 0);
        when(rendezVousService.createRendezVous(2L, 1L, "Consultation", date)).thenReturn(rendezVous);

        mockMvc.perform(post("/api/clients/1/rendezvous/2")
                        .param("date", date.toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.motif").value("Consultation"));
    }

}
