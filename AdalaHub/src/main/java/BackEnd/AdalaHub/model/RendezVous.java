package BackEnd.AdalaHub.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rendez_vous")
public class RendezVous {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "avocat_id", nullable = false)
    private AvocatDetails avocat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @Column(name = "motif", nullable = false)
    @NotBlank(message = "Le motif est obligatoire")
    private String motif;

    @Column(name = "date_heure", nullable = false)
    @Future(message = "La date doit être dans le futur")
    private LocalDateTime dateHeure;

    @Column(name = "statut")
    private String statut = "EN_ATTENTE";

    public RendezVous() {
    }

    public RendezVous(AvocatDetails avocat, Client client, String motif, LocalDateTime dateHeure) {
        this.avocat = avocat;
        this.client = client;
        this.motif = motif;
        this.dateHeure = dateHeure;
    }

    public Long getId() {
        return id;
    }

    public AvocatDetails getAvocat() {
        return avocat;
    }

    public Client getClient() {
        return client;
    }

    public Long getClientId() {
        return client.getId();
    }

    public String getMotif() {
        return motif;
    }

    public LocalDateTime getDateHeure() {
        return dateHeure;
    }

    public String getStatut() {
        return statut;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAvocat(AvocatDetails avocat) {
        this.avocat = avocat;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public void setDateHeure(LocalDateTime dateHeure) {
        this.dateHeure = dateHeure;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }
}
