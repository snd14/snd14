export class Budget{
    id:number;
    version:number;
    annee:number;
    montant:number;
    montant_propose_bureau:number;
    montant_propose_drp:number;
    montant_execute:number;

}
/*
private Collection<SuiviBudget>  suiviBudgets;
@ManyToOne
@JoinColumn(name ="idStructure", referencedColumnName = "id")
private Structure structure;
@JsonIgnore
@OneToMany(mappedBy = "budget")
//changer récement
private Collection<LigneBudgetaire> ligneBudgetaires;*/