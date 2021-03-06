package com.jwlee.shortLinkTest.webapp.controller;

import com.jwlee.shortLinkTest.common.util.Base62Util;
import com.jwlee.shortLinkTest.webapp.common.ErrorInfo;
import com.jwlee.shortLinkTest.webapp.common.ReturnData;
import com.jwlee.shortLinkTest.webapp.db.search.model.SearchHistory;
import com.jwlee.shortLinkTest.webapp.db.search.repository.SearchHistoryRepository;
import com.jwlee.shortLinkTest.webapp.db.search.service.SearchHistoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;

/**
* SearchHistoryController
* @author jungwoolee
* @since 2019-08-11
**/
@RequestMapping("/shortLink")
@Controller
public class ShortLinkTestController {
    private static final Logger logger = LoggerFactory.getLogger(ShortLinkTestController.class);


    @Autowired
    SearchHistoryRepository searchHistoryRepository;

    @Resource(name = "searchHistoryService")
    private SearchHistoryService searchHistoryService;

    /**
     * 계정 로그인
     **/
    @RequestMapping(value="getUrlToShortLink.do")
    public @ResponseBody
    ReturnData getUrlToShortLink(@RequestParam Map<String, Object> reqMap, HttpServletRequest request) throws Exception{
        ReturnData returnData = new ReturnData();
        try {

            String url = reqMap.get("originalUrl").toString();
            String protocolHostname = reqMap.get("protocolHostname").toString();

            Random rnd = new Random();
            long random_key = Math.abs(rnd.nextLong() % 10000000000L);
            SearchHistory findCheckOriginalUrl = searchHistoryRepository.findByOriginalUrl(url);
            SearchHistory findCheckShortUrl = searchHistoryRepository.findByShortUrl(url);

            if(findCheckOriginalUrl == null)
            {//original_url DB에 없을 때
                if(findCheckShortUrl == null)
                {//short_url로 입력했을 경우 DB에 있는지 검사, 없을 경우
                    //shortUrl도 DB에 없을때 -> DB에 삽입
                    System.out.println("original_url is not exist" );

                    //랜덤키 -> 62진수 변환
                    String shortUrl = Base62Util.getBase62UtilInstance().encodeToLong(random_key);
                    System.out.println("ENCODE : "+shortUrl+", DECODE : " + Base62Util.getBase62UtilInstance().decodeToLong(shortUrl));

                    SearchHistory searchHistory = new SearchHistory(reqMap.get("originalUrl").toString(), random_key, protocolHostname + shortUrl, Timestamp.valueOf(LocalDateTime.now()), 1);

                    searchHistoryService.save(searchHistory);
                    returnData.setResultData(searchHistory);
                }
                else
                {//short_url이 DB에 있을 경우 > 원래 url로 리다이렉트 해주기 위해
                    System.out.println("short_url is here!!");
                    String tempShortUrl = findCheckShortUrl.getShort_url();

                    SearchHistory searchHistory = new SearchHistory(tempShortUrl, random_key, findCheckShortUrl.getOriginal_url(), Timestamp.valueOf(LocalDateTime.now()), 1);
                    //숏터닝 url을 입력하였을 경우, 원래 original_url을 보여주기 위해 거꾸로 저장.
                    //숏터닝 url을 original_url에 저장
                    //original_url을 short_url에 저장

                    searchHistoryService.save(searchHistory);
                    returnData.setResultData(searchHistory);
                }
            }
            else {//original_url DB에 있을 때, 따로 저장로직필요없이 해당 데이터의 카운트를 1 증가 시켜 준다.
                System.out.println("original_url is here!!");
                searchHistoryRepository.updateHistoryCnt(findCheckOriginalUrl);
                returnData.setResultData(findCheckOriginalUrl);

                return returnData;
            }

        } catch(Exception e) {
            e.printStackTrace();
            returnData = new ReturnData(new ErrorInfo(e));
        }
        return returnData;
    }


    @RequestMapping(value = "getSearchHistoryList.do")
    @ResponseBody
    public ReturnData getSearchHistoryList(HttpServletRequest req, HttpServletResponse res)  {
        try {
            ReturnData returnData= new ReturnData();
            returnData.setResultData(searchHistoryService.getSearchHistoryList(req,res));
            return returnData;
        } catch (Exception e) {
            logger.info(e.getMessage());
            return new ReturnData(new ErrorInfo(e));
        }
    }



}
