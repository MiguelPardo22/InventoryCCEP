package com.api.backendCCEP.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.backendCCEP.Model.Sale_Detail;

@Repository
public interface Sale_DetailRepository extends JpaRepository<Sale_Detail, Long> {

}
