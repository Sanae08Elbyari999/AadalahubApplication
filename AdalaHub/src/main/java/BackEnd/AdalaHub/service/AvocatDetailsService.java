package BackEnd.AdalaHub.service;

import BackEnd.AdalaHub.model.AvocatDetails;
import BackEnd.AdalaHub.repository.AvocatDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AvocatDetailsService {

    private final AvocatDetailsRepository avocatDetailsRepository;

    @Autowired
    public AvocatDetailsService(AvocatDetailsRepository avocatDetailsRepository) {
        this.avocatDetailsRepository = avocatDetailsRepository;
    }

    // CREATE or UPDATE
    public AvocatDetails saveAvocat(AvocatDetails avocatDetails) {
        return avocatDetailsRepository.save(avocatDetails);
    }

    // READ all
    public List<AvocatDetails> getAllAvocats() {
        return avocatDetailsRepository.findAll();
    }

    // READ by ID
    public Optional<AvocatDetails> getAvocatById(Long id) {
        return avocatDetailsRepository.findById(id);
    }

    // DELETE by ID
    public void deleteAvocat(Long id) {
        avocatDetailsRepository.deleteById(id);
    }

    // Check existence by ID
    public boolean existsById(Long id) {
        return avocatDetailsRepository.existsById(id);
    }

    public List<AvocatDetails> getAvocatsDisponiblesEnLigne() {
        return avocatDetailsRepository.findByDisponibleEnLigneTrue();
    }




}


