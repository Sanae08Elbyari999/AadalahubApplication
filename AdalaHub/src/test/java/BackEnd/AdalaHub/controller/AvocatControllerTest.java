package BackEnd.AdalaHub.controller;

import BackEnd.AdalaHub.model.AvocatDetails;
import BackEnd.AdalaHub.repository.AvocatDetailsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AvocatControllerTest {

    @Mock
    private AvocatDetailsRepository avocatDetailsRepository;

    @InjectMocks
    private AvocatController avocatController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllAvocats() {
        AvocatDetails avocat1 = new AvocatDetails();
        avocat1.setId(1L);
        avocat1.setNom("Me Salah");

        AvocatDetails avocat2 = new AvocatDetails();
        avocat2.setId(2L);
        avocat2.setNom("Me Fatima");

        when(avocatDetailsRepository.findAll()).thenReturn(Arrays.asList(avocat1, avocat2));

        ResponseEntity<List<AvocatDetails>> response = avocatController.getAllAvocats();
        List<AvocatDetails> result = response.getBody();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(avocatDetailsRepository, times(1)).findAll();
    }

    @Test
    void testGetAvocatById_found() {
        AvocatDetails avocat = new AvocatDetails();
        avocat.setId(1L);
        avocat.setNom("Me Amine");

        when(avocatDetailsRepository.findById(1L)).thenReturn(Optional.of(avocat));

        ResponseEntity<AvocatDetails> response = avocatController.getAvocatById(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Me Amine", response.getBody().getNom());
        verify(avocatDetailsRepository, times(1)).findById(1L);
    }

    @Test
    void testGetAvocatById_notFound() {
        when(avocatDetailsRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<AvocatDetails> response = avocatController.getAvocatById(1L);

        assertEquals(404, response.getStatusCodeValue());
        assertNull(response.getBody());
        verify(avocatDetailsRepository, times(1)).findById(1L);
    }

    @Test
    void testCreateAvocat() {
        AvocatDetails avocat = new AvocatDetails();
        avocat.setNom("Me Zineb");

        when(avocatDetailsRepository.save(avocat)).thenReturn(avocat);

        ResponseEntity<AvocatDetails> response = avocatController.createAvocat(avocat);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Me Zineb", response.getBody().getNom());
        verify(avocatDetailsRepository, times(1)).save(avocat);
    }
}
