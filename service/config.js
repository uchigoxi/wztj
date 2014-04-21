/**
 * Created by zy on 14-3-6.
 */

module.exports = {

  CONST: {
    STATUS: {
      'NORMAL': 0,
      'INVALID': 1,
      'COMMENT_NOT_AUDIT': 2,
      'GOODS_ALREADY_USE': 3,
      'MALL_ALREADY_SELL': 4,
      'PRIZE_ALREADY_GOT': 5,
      'GOODS_EXCHANGE': 6
    },
    USEFOR: {
      'NOUSE': 0,
      'MALL': 1,
      'ACTIVITY_STANDARD': 2,
      'ACTIVITY_BUSINESS': 3,
      'ACTIVITY_PERSON': 4,
      'FREE': 4,
      'OTHER': 6
    },
    ACTIVITY_TYPE: {
      'GUAGUAKA': 1,
      'DAZHUANPAN': 2,
      'YAOSHAIZI': 3
    },
    SEX: {
      'WOMAN': 0,
      'MAN': 1,
      'WHAT': 2
    },
    PRIZETYPE: {
      INTERGRAL: 0,
      ENTITY: 1
    },
    ACTIVITY_PERSON_WINNER: {
      CREATER: 0,
      PLAYER: 1
    }
  },

  REDIS: {
    ip: '127.0.0.1',
    port: 6379,
    user_info_str: 'user_info_',
    token_time_out: 600,// * 60 * 2,
    token_str: 'user_token_',
    as_session_str: 'as_session',
    as_recommend_str: 'as_recommend',
    document_support_srt: 'document_support',
    activity_person_srt: 'activity_person'
  },

  CHECKIN: {
    reg: 50,
    one: 10,
    max: 5,
    inite: 20,
    upload: 10
  },

  ACTIVITY: {
    STANDARD: {
      base_prize: {
        aid: 0,
        level: 4,
        name: '四等奖',
        type: 0,
        goods_name: '',
        num: 10,
        rate: 100 }
    }
  },

  PIC: {
    upload_allow_files: "*",//".gif.png.jpg.jpeg.bmp",
    upload_max_size: 10000000,
    upload_save_path: "/Users/zy/node/WebstormProjects/wztj/upload/",
    upload_save_url: "http://172.16.201.151:3000/"
  }

}