package BackEnd.AdalaHub.repository;

import BackEnd.AdalaHub.model.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {

    boolean existsByAvocatIdAndDateHeure(Long avocatId, LocalDateTime dateHeure);

    List<RendezVous> findByAvocatId(Long avocatId);

    List<RendezVous> findByClient_Id(Long clientId);
}
