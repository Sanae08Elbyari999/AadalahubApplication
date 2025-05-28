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

    // READ by Email
    public Optional<AvocatDetails> getAvocatByEmail(String email) {
        return avocatDetailsRepository.findByEmail(email);
    }

    // Check existence by Email
    public boolean existsByEmail(String email) {
        return avocatDetailsRepository.existsByEmail(email);
    }

    // Avocats disponibles en ligne
    public List<AvocatDetails> getAvocatsDisponiblesEnLigne() {
        return avocatDetailsRepository.findByDisponibleEnLigneTrue();
    }

    // Avocats disponibles au cabinet
    public List<AvocatDetails> getAvocatsDisponiblesAuCabinet() {
        return avocatDetailsRepository.findByDisponibleAuCabinetTrue();
    }

    // Avocats certifiés
    public List<AvocatDetails> getAvocatsCertifies() {
        return avocatDetailsRepository.findByCertifieTrue();
    }

    // Recherche par spécialité
    public List<AvocatDetails> searchBySpecialite(String specialite) {
        return avocatDetailsRepository.findBySpecialitesContainingIgnoreCase(specialite);
    }

    // Recherche par nom ou prénom
    public List<AvocatDetails> searchByNomOuPrenom(String keyword) {
        return avocatDetailsRepository.findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(keyword, keyword);
    }

    // Recherche par adresse du cabinet
    public List<AvocatDetails> searchByAdresse(String adresse) {
        return avocatDetailsRepository.findByOfficeAddressContainingIgnoreCase(adresse);
    }

    // Recherche par pays
    public List<AvocatDetails> searchByPays(String pays) {
        return avocatDetailsRepository.findByPaysIgnoreCase(pays);
    }
    // Recherche combinée
    public List<AvocatDetails> rechercherAvocats(String searchText, String ville, String filter, String service) {
        // Simplification basique pour une démonstration ; idéalement, tu utilises JPA Specifications ou QueryDSL.

        if (filter.equalsIgnoreCase("Office") && !ville.equalsIgnoreCase("Où ?")) {
            return avocatDetailsRepository
                    .findByOfficeAddressContainingIgnoreCaseAndSpecialitesContainingIgnoreCase(ville, searchText);
        } else if (filter.equalsIgnoreCase("En ligne")) {
            return avocatDetailsRepository
                    .findByDisponibleEnLigneTrueAndSpecialitesContainingIgnoreCase(searchText);
        } else {
            return avocatDetailsRepository
                    .findBySpecialitesContainingIgnoreCaseOrNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(
                            searchText, searchText, searchText);
        }
    }

}
