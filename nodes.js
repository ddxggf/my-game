const INITIALS = ['b','p','m','f','d','t','n','l','g','k','h','j','q','x','r','z','c','s','y','w'];
const FINALS = ['a','o','e','i','u','ü','ai','ei','ui','ao','ou','iu','ie','üe','er','an','en','in','un','ün','ang','eng','ing','ong','ia','ua','uo','iao','ian','uai','uan','uang'];
const WHOLE_SYLLABLES = ['zhi','chi','shi','ri','zi','ci','si','yi','wu','yu','ye','yue','yuan','yin','yun','ying'];
const VALID_PINYINS = new Set("ba bo bai bei bao ban ben bang beng bi bie biao bian bin bing bu pa po pai pei pao pou pan pen pang peng pi pie piao pian pin ping pu ma mo me mai mei mao mou man men mang meng mi mie miao miu mian min ming mu fa fo fei fou fan fen fang feng fu da de dai dei dao dou dan den dang deng dong di die diao diu dian ding du duo dui duan dun ta te tai tao tou tan tang teng tong ti tie tiao tian ting tu tuo tui tuan tun na ne nai nei nao nou nan nen nang neng nong ni nie niao niu nian nin niang ning nu nuo nuan nü nüe la le lai lei lao lou lan lang leng long li lia lie liao liu lian lin liang ling lu luo luan lun lü lüe ga ge gai gei gao gou gan gen gang geng gong gu gua guo guai gui guan gun guang ka ke kai kei kao kou kan ken kang keng kong ku kua kuo kuai kui kuan kun kuang ha he hai hei hao hou han hen hang heng hong hu hua huo huai hui huan hun huang ji jia jie jiao jiu jian jin jiang jing jiong ju jue juan jun qi qia qie qiao qiu qian qin qiang qing qiong qu que quan qun xi xia xie xiao xiu xian xin xiang xing xiong xu xue xuan xun zha zhe zhi zhai zhei zhao zhou zhan zhen zhang zheng zhong zhu zhua zhuo zhuai zhui zhuan zhun zhuang cha che chi chai chao chou chan chen chang cheng chong chu chua chuo chuai chui chuan chun chuang sha she shi shai shei shao shou shan shen shang sheng shu shua shuo shuai shui shuan shun shuang re ri rao rou ran ren rang reng rong ru rua ruo rui ruan run za ze zi zai zei zao zou zan zen zang zeng zong zu zuo zui zuan zun ca ce ci cai cao cou can cen cang ceng cong cu cuo cui cuan cun sa se si sai sao sou san sen sang seng song su suo sui suan sun ya ye yao you yan yin yang ying yong yi yu yue yuan yun wa wo wai wei wan wen wang weng wu".split(' '));

const WORDS = [
{c:'妈',p:'ma',t:1,s:'m',y:'a'},{c:'麻',p:'ma',t:2,s:'m',y:'a'},{c:'马',p:'ma',t:3,s:'m',y:'a'},{c:'骂',p:'ma',t:4,s:'m',y:'a'},
{c:'花',p:'hua',t:1,s:'h',y:'ua'},{c:'话',p:'hua',t:4,s:'h',y:'ua'},{c:'猫',p:'mao',t:1,s:'m',y:'ao'},{c:'毛',p:'mao',t:2,s:'m',y:'ao'},
{c:'鱼',p:'yu',t:2,w:'yu'},{c:'天',p:'tian',t:1,s:'t',y:'ian'},{c:'云',p:'yun',t:2,w:'yun'},{c:'山',p:'shan',t:1,s:'sh',y:'an'},
{c:'水',p:'shui',t:3,s:'sh',y:'ui'},{c:'火',p:'huo',t:3,s:'h',y:'uo'},{c:'牛',p:'niu',t:2,s:'n',y:'iu'},{c:'羊',p:'yang',t:2,s:'y',y:'ang'},
{c:'鸟',p:'niao',t:3,s:'n',y:'iao'},{c:'虫',p:'chong',t:2,s:'ch',y:'ong'},{c:'手',p:'shou',t:3,s:'sh',y:'ou'},{c:'大',p:'da',t:4,s:'d',y:'a'},
{c:'小',p:'xiao',t:3,s:'x',y:'iao'},{c:'学',p:'xue',t:2,s:'x',y:'üe'},{c:'雪',p:'xue',t:3,s:'x',y:'üe'},{c:'星',p:'xing',t:1,s:'x',y:'ing'},
{c:'月',p:'yue',t:4,w:'yue'},{c:'日',p:'ri',t:4,w:'ri'},{c:'草',p:'cao',t:3,s:'c',y:'ao'},{c:'果',p:'guo',t:3,s:'g',y:'uo'},
{c:'飞',p:'fei',t:1,s:'f',y:'ei'},{c:'看',p:'kan',t:4,s:'k',y:'an'},{c:'听',p:'ting',t:1,s:'t',y:'ing'},{c:'白',p:'bai',t:2,s:'b',y:'ai'},
{c:'吃',p:'chi',t:1,w:'chi'},{c:'出',p:'chu',t:1,s:'ch',y:'u'},{c:'打',p:'da',t:3,s:'d',y:'a'},{c:'弟',p:'di',t:4,s:'d',y:'i'},
{c:'多',p:'duo',t:1,s:'d',y:'uo'},{c:'儿',p:'er',t:2,s:'',y:'er'},{c:'饭',p:'fan',t:4,s:'f',y:'an'},{c:'风',p:'feng',t:1,s:'f',y:'eng'},
{c:'高',p:'gao',t:1,s:'g',y:'ao'},{c:'狗',p:'gou',t:3,s:'g',y:'ou'},{c:'国',p:'guo',t:2,s:'g',y:'uo'},{c:'好',p:'hao',t:3,s:'h',y:'ao'},
{c:'红',p:'hong',t:2,s:'h',y:'ong'},{c:'鸡',p:'ji',t:1,s:'j',y:'i'},{c:'家',p:'jia',t:1,s:'j',y:'ia'},{c:'见',p:'jian',t:4,s:'j',y:'ian'},
{c:'叫',p:'jiao',t:4,s:'j',y:'iao'},{c:'九',p:'jiu',t:3,s:'j',y:'iu'},{c:'开',p:'kai',t:1,s:'k',y:'ai'},{c:'老',p:'lao',t:3,s:'l',y:'ao'},
{c:'两',p:'liang',t:3,s:'l',y:'iang'},{c:'绿',p:'lü',t:4,s:'l',y:'ü'},{c:'门',p:'men',t:2,s:'m',y:'en'},{c:'米',p:'mi',t:3,s:'m',y:'i'},
{c:'明',p:'ming',t:2,s:'m',y:'ing'},{c:'拿',p:'na',t:2,s:'n',y:'a'},{c:'你',p:'ni',t:3,s:'n',y:'i'},{c:'女',p:'nü',t:3,s:'n',y:'ü'},
{c:'跑',p:'pao',t:3,s:'p',y:'ao'},{c:'七',p:'qi',t:1,s:'q',y:'i'},{c:'去',p:'qu',t:4,s:'q',y:'ü'},{c:'三',p:'san',t:1,s:'s',y:'an'},
{c:'上',p:'shang',t:4,s:'sh',y:'ang'},{c:'十',p:'shi',t:2,w:'shi'},{c:'书',p:'shu',t:1,s:'sh',y:'u'},{c:'四',p:'si',t:4,w:'si'},
{c:'他',p:'ta',t:1,s:'t',y:'a'},{c:'外',p:'wai',t:4,s:'w',y:'ai'},{c:'我',p:'wo',t:3,s:'w',y:'o'},{c:'五',p:'wu',t:3,w:'wu'},
{c:'西',p:'xi',t:1,s:'x',y:'i'},{c:'下',p:'xia',t:4,s:'x',y:'ia'},{c:'一',p:'yi',t:1,w:'yi'},{c:'用',p:'yong',t:4,s:'y',y:'ong'},
{c:'有',p:'you',t:3,s:'y',y:'ou'},{c:'早',p:'zao',t:3,s:'z',y:'ao'},{c:'站',p:'zhan',t:4,s:'zh',y:'an'},{c:'中',p:'zhong',t:1,s:'zh',y:'ong'},
{c:'字',p:'zi',t:4,w:'zi'},{c:'走',p:'zou',t:3,s:'z',y:'ou'},{c:'爸',p:'ba',t:4,s:'b',y:'a'},{c:'半',p:'ban',t:4,s:'b',y:'an'}
];
