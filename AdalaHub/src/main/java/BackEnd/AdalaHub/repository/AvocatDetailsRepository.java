package BackEnd.AdalaHub.repository;

import BackEnd.AdalaHub.model.AvocatDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AvocatDetailsRepository extends JpaRepository<AvocatDetails, Long> {

    Optional<AvocatDetails> findByEmail(String email);

    boolean existsByEmail(String email);

    List<AvocatDetails> findByDisponibleEnLigneTrue();

    List<AvocatDetails> findByDisponibleAuCabinetTrue();

    List<AvocatDetails> findByCertifieTrue();

    List<AvocatDetails> findBySpecialitesContainingIgnoreCase(String specialite);

    List<AvocatDetails> findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(String nom, String prenom);


    List<AvocatDetails> findByOfficeAddressContainingIgnoreCase(String adresse);

    List<AvocatDetails> findByPaysIgnoreCase(String pays);
    List<AvocatDetails> findByVilleIgnoreCaseAndSpecialitesContainingIgnoreCase(String ville, String specialite);
    List<AvocatDetails> findByOfficeAddressContainingIgnoreCaseAndSpecialitesContainingIgnoreCase(String ville, String specialite);
    List<AvocatDetails> findByDisponibleEnLigneTrueAndSpecialitesContainingIgnoreCase(String specialite);
    List<AvocatDetails> findBySpecialitesContainingIgnoreCaseOrNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(String specialite, String nom, String prenom);

}
