// noodles.js - 拼音数据文件
const INITIALS = ['b','p','m','f','d','t','n','l','g','k','h','j','q','x','r','z','c','s','y','w'];
const FINALS = ['a','o','e','i','u','ü','ai','ei','ui','ao','ou','iu','ie','üe','er','an','en','in','un','ün','ang','eng','ing','ong','ia','ua','uo','iao','ian','uai','uan','uang'];
const WHOLE_SYLLABLES = ['zhi','chi','shi','ri','zi','ci','si','yi','wu','yu','ye','yue','yuan','yin','yun','ying'];

const VALID_PINYINS = new Set(("ba bo bai bei bao ban ben bang beng bi bie biao bian bin bing bu pa po pai pei pao pou pan pen pang peng pi pie piao pian pin ping pu ma mo me mai mei mao mou man men mang meng mi mie miao miu mian min ming mu fa fo fei fou fan fen fang feng fu da de dai dei dao dou dan den dang deng dong di die diao diu dian ding du duo dui duan dun ta te tai tao tou tan tang teng tong ti tie tiao tian ting tu tuo tui tuan tun na ne nai nei nao nou nan nen nang neng nong ni nie niao niu nian nin niang ning nu nuo nuan nü nüe la le lai lei lao lou lan lang leng long li lia lie liao liu lian lin liang ling lu luo luan lun lü lüe ga ge gai gei gao gou gan gen gang geng gong gu gua guo guai gui guan gun guang ka ke kai kei kao kou kan ken kang keng kong ku kua kuo kuai kui kuan kun kuang ha he hai hei hao hou han hen hang heng hong hu hua huo huai hui huan hun huang ji jia jie jiao jiu jian jin jiang jing jiong ju jue juan jun qi qia qie qiao qiu qian qin qiang qing qiong qu que quan qun xi xia xie xiao xiu xian xin xiang xing xiong xu xue xuan xun zha zhe zhi zhai zhei zhao zhou zhan zhen zhang zheng zhong zhu zhua zhuo zhuai zhui zhuan zhun zhuang cha che chi chai chao chou chan chen chang cheng chong chu chua chuo chuai chui chuan chun chuang sha she shi shai shei shao shou shan shen shang sheng shu shua shuo shuai shui shuan shun shuang re ri rao rou ran ren rang reng rong ru rua ruo rui ruan run za ze zi zai zei zao zou zan zen zang zeng zong zu zuo zui zuan zun ca ce ci cai cao cou can cen cang ceng cong cu cuo cui cuan cun sa se si sai sao sou san sen sang seng song su suo sui suan sun ya ye yao you yan yin yang ying yong yi yu yue yuan yun wa wo wai wei wan wen wang weng wu").split(' '));

const WORDS = [
    { c: '妈', p: 'ma', t: 1, sm: 'm', ym: 'a' }, { c: '麻', p: 'ma', t: 2, sm: 'm', ym: 'a' }, { c: '马', p: 'ma', t: 3, sm: 'm', ym: 'a' }, { c: '骂', p: 'ma', t: 4, sm: 'm', ym: 'a' },
    { c: '花', p: 'hua', t: 1, sm: 'h', ym: 'ua' }, { c: '话', p: 'hua', t: 4, sm: 'h', ym: 'ua' },
    { c: '猫', p: 'mao', t: 1, sm: 'm', ym: 'ao' }, { c: '毛', p: 'mao', t: 2, sm: 'm', ym: 'ao' }, { c: '帽', p: 'mao', t: 4, sm: 'm', ym: 'ao' },
    { c: '鱼', p: 'yu', t: 2, whole: 'yu' }, { c: '雨', p: 'yu', t: 3, whole: 'yu' },
    { c: '天', p: 'tian', t: 1, sm: 't', ym: 'ian' }, { c: '田', p: 'tian', t: 2, sm: 't', ym: 'ian' },
    { c: '云', p: 'yun', t: 2, whole: 'yun' },
    { c: '山', p: 'shan', t: 1, sm: 'sh', ym: 'an' }, { c: '闪', p: 'shan', t: 3, sm: 'sh', ym: 'an' },
    { c: '水', p: 'shui', t: 3, sm: 'sh', ym: 'ui' }, { c: '火', p: 'huo', t: 3, sm: 'h', ym: 'uo' },
    { c: '牛', p: 'niu', t: 2, sm: 'n', ym: 'iu' }, { c: '羊', p: 'yang', t: 2, sm: 'y', ym: 'ang' },
    { c: '鸟', p: 'niao', t: 3, sm: 'n', ym: 'iao' }, { c: '虫', p: 'chong', t: 2, sm: 'ch', ym: 'ong' },
    { c: '手', p: 'shou', t: 3, sm: 'sh', ym: 'ou' }, { c: '大', p: 'da', t: 4, sm: 'd', ym: 'a' },
    { c: '小', p: 'xiao', t: 3, sm: 'x', ym: 'iao' }, { c: '学', p: 'xue', t: 2, sm: 'x', ym: 'üe' },
    { c: '雪', p: 'xue', t: 3, sm: 'x', ym: 'üe' }, { c: '星', p: 'xing', t: 1, sm: 'x', ym: 'ing' },
    { c: '月', p: 'yue', t: 4, whole: 'yue' }, { c: '日', p: 'ri', t: 4, whole: 'ri' },
    { c: '草', p: 'cao', t: 3, sm: 'c', ym: 'ao' }, { c: '果', p: 'guo', t: 3, sm: 'g', ym: 'uo' },
    { c: '飞', p: 'fei', t: 1, sm: 'f', ym: 'ei' }, { c: '看', p: 'kan', t: 4, sm: 'k', ym: 'an' },
    { c: '听', p: 'ting', t: 1, sm: 't', ym: 'ing' }, { c: '白', p: 'bai', t: 2, sm: 'b', ym: 'ai' },
    { c: '吃', p: 'chi', t: 1, whole: 'chi' }, { c: '出', p: 'chu', t: 1, sm: 'ch', ym: 'u' },
    { c: '打', p: 'da', t: 3, sm: 'd', ym: 'a' }, { c: '弟', p: 'di', t: 4, sm: 'd', ym: 'i' },
    { c: '多', p: 'duo', t: 1, sm: 'd', ym: 'uo' }, { c: '儿', p: 'er', t: 2, sm: '', ym: 'er' },
    { c: '饭', p: 'fan', t: 4, sm: 'f', ym: 'an' }, { c: '风', p: 'feng', t: 1, sm: 'f', ym: 'eng' },
    { c: '高', p: 'gao', t: 1, sm: 'g', ym: 'ao' }, { c: '狗', p: 'gou', t: 3, sm: 'g', ym: 'ou' },
    { c: '国', p: 'guo', t: 2, sm: 'g', ym: 'uo' }, { c: '好', p: 'hao', t: 3, sm: 'h', ym: 'ao' },
    { c: '红', p: 'hong', t: 2, sm: 'h', ym: 'ong' }, { c: '鸡', p: 'ji', t: 1, sm: 'j', ym: 'i' },
    { c: '家', p: 'jia', t: 1, sm: 'j', ym: 'ia' }, { c: '见', p: 'jian', t: 4, sm: 'j', ym: 'ian' },
    { c: '叫', p: 'jiao', t: 4, sm: 'j', ym: 'iao' }, { c: '九', p: 'jiu', t: 3, sm: 'j', ym: 'iu' },
    { c: '开', p: 'kai', t: 1, sm: 'k', ym: 'ai' }, { c: '老', p: 'lao', t: 3, sm: 'l', ym: 'ao' },
    { c: '两', p: 'liang', t: 3, sm: 'l', ym: 'iang' }, { c: '绿', p: 'lü', t: 4, sm: 'l', ym: 'ü' },
    { c: '门', p: 'men', t: 2, sm: 'm', ym: 'en' }, { c: '米', p: 'mi', t: 3, sm: 'm', ym: 'i' },
    { c: '明', p: 'ming', t: 2, sm: 'm', ym: 'ing' }, { c: '拿', p: 'na', t: 2, sm: 'n', ym: 'a' },
    { c: '你', p: 'ni', t: 3, sm: 'n', ym: 'i' }, { c: '女', p: 'nü', t: 3, sm: 'n', ym: 'ü' },
    { c: '跑', p: 'pao', t: 3, sm: 'p', ym: 'ao' }, { c: '七', p: 'qi', t: 1, sm: 'q', ym: 'i' },
    { c: '去', p: 'qu', t: 4, sm: 'q', ym: 'ü' }, { c: '三', p: 'san', t: 1, sm: 's', ym: 'an' },
    { c: '上', p: 'shang', t: 4, sm: 'sh', ym: 'ang' }, { c: '十', p: 'shi', t: 2, whole: 'shi' },
    { c: '书', p: 'shu', t: 1, sm: 'sh', ym: 'u' }, { c: '四', p: 'si', t: 4, whole: 'si' },
    { c: '他', p: 'ta', t: 1, sm: 't', ym: 'a' }, { c: '外', p: 'wai', t: 4, sm: 'w', ym: 'ai' },
    { c: '我', p: 'wo', t: 3, sm: 'w', ym: 'o' }, { c: '五', p: 'wu', t: 3, whole: 'wu' },
    { c: '西', p: 'xi', t: 1, sm: 'x', ym: 'i' }, { c: '下', p: 'xia', t: 4, sm: 'x', ym: 'ia' },
    { c: '一', p: 'yi', t: 1, whole: 'yi' }, { c: '用', p: 'yong', t: 4, sm: 'y', ym: 'ong' },
    { c: '有', p: 'you', t: 3, sm: 'y', ym: 'ou' }, { c: '早', p: 'zao', t: 3, sm: 'z', ym: 'ao' },
    { c: '站', p: 'zhan', t: 4, sm: 'zh', ym: 'an' }, { c: '中', p: 'zhong', t: 1, sm: 'zh', ym: 'ong' },
    { c: '字', p: 'zi', t: 4, whole: 'zi' }, { c: '走', p: 'zou', t: 3, sm: 'z', ym: 'ou' }
];
