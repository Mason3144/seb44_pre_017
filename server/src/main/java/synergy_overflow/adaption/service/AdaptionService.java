package synergy_overflow.adaption.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import synergy_overflow.adaption.entity.Adaption;
import synergy_overflow.adaption.repository.AdaptionRepository;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.exception.businessLogicException.ExceptionCode;

import java.util.Optional;

@Service
@Transactional
public class AdaptionService {

    private final AdaptionRepository adaptionRepository;

    public AdaptionService(AdaptionRepository adaptionRepository) {
        this.adaptionRepository = adaptionRepository;
    }

    public void deleteAdaption(long adaptionId){
        Adaption findAdaption = findAdaption(adaptionId);
        adaptionRepository.delete(findAdaption);
    }

    public Adaption findAdaption(long adaptionId){
        Optional<Adaption> optionalAdaption =
                adaptionRepository.findById(adaptionId);

        Adaption findAdaption = optionalAdaption.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAdaption;
    }


}
