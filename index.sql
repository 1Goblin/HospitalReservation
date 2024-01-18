-- Doctor 테이블에 대한 인덱스 생성
CREATE INDEX idx_D_id ON hospital.Doctor (D_id);
-- Doctor 테이블의 외래 키에 대한 인덱스 생성
CREATE INDEX idx_D_M_id ON hospital.Doctor (D_M_id);
-- Patient 테이블에 대한 인덱스 생성
CREATE INDEX idx_P_id ON hospital.Patient (P_id);
-- Nurse 테이블에 대한 인덱스 생성
CREATE INDEX idx_N_id ON hospital.Nurse (N_id);
-- Nurse 테이블의 외래 키에 대한 인덱스 생성
CREATE INDEX idx_N_M_id ON hospital.Nurse (N_M_id);
-- Medical_specialty 테이블에 대한 인덱스 생성
CREATE INDEX idx_M_id ON hospital.Medical_specialty (M_id);
-- Reservation 테이블에 대한 인덱스 생성
CREATE INDEX idx_R_id ON hospital.Reservation (R_id);
-- Reservation 테이블의 외래 키에 대한 인덱스 생성
CREATE INDEX idx_R_P_id ON hospital.Reservation (R_P_id);
CREATE INDEX idx_R_D_id ON hospital.Reservation (R_D_id);
CREATE INDEX idx_R_M_id ON hospital.Reservation (R_M_id);
-- Examination 테이블에 대한 인덱스 생성
CREATE INDEX idx_E_id ON hospital.Examination (E_id);
-- Examination 테이블의 외래 키에 대한 인덱스 생성
CREATE INDEX idx_E_D_id ON hospital.Examination (E_D_id);
CREATE INDEX idx_E_P_id ON hospital.Examination (E_P_id);
-- Treatment 테이블에 대한 인덱스 생성
CREATE INDEX idx_T_id ON hospital.Treatment (T_id);
-- Treatment 테이블의 외래 키에 대한 인덱스 생성
CREATE INDEX idx_T_N_id ON hospital.Treatment (T_N_id);
CREATE INDEX idx_T_P_id ON hospital.Treatment (T_P_id);
-- Inpatient 테이블에 대한 인덱스 생성
CREATE INDEX idx_I_id ON hospital.Inpatient (I_id);
-- Inpatient 테이블의 외래 키에 대한 인덱스 생성
CREATE INDEX idx_I_P_id ON hospital.Inpatient (I_P_id);
