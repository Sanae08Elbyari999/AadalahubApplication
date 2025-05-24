package BackEnd.AdalaHub.repository;

import BackEnd.AdalaHub.model.AvocatDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvocatDetailsRepository extends JpaRepository<AvocatDetails, Long> {

    AvocatDetails findByEmail(String email);

    boolean existsByEmail(String email);

    List<AvocatDetails> findByDisponibleEnLigneTrue();
}