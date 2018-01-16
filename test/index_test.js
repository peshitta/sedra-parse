const { strictEqual } = require('assert');
const {
  getRoots,
  getLexemes,
  getWords,
  getEnglish,
  getEtymology,
  getUbs
} = require('../build/sedra-parse');

describe('Root', () => {
  it('Build Root Javascript', () => {
    const js = getRoots(
      '0:40,"AONGL;ON","afncljfn     |0",0\r\n' +
        '0:41,"AON;XA","afnjsa       |0",0\r\n' +
        '0:42,"AO/RA","art          |0",2\r\n' +
        '0:43,"AOX;NA","asn          |0",4\r\n' +
        '0:44,"AORBNOS","aftbnfo      |0",0\r\n' +
        '0:45,"AORDEA","atdp         |0",2\r\n' +
        '0:46,"AOROS","ato          |0",4\r\n'
    );
    const expected =
      'Object.freeze([,' +
      'r(")wnglywn","afncljfn     |0",0),' +
      'r(")wnyq)","afnjsa       |0",0),' +
      'r(")wcr)","art          |0",2),' +
      'r(")wqyn)","asn          |0",4),' +
      'r(")wrbnws","aftbnfo      |0",0),' +
      'r(")wrd()","atdp         |0",2),' +
      'r(")wrws","ato          |0",4)]);';
    strictEqual(js, expected, 'parsed roots');
  });
});

describe('Lexeme', () => {
  it('Build Lexeme Javascript', () => {
    const js = getLexemes(
      '1:124,0:93,"ACI",0,0\r\n' +
        '1:125,0:94,"ACRA",0,16\r\n' +
        '1:126,0:95,"ACTA",0,16\r\n' +
        '1:127,0:96,"ALA",0,100\r\n' +
        '1:128,0:97,"ALA",0,0\r\n' +
        '1:129,0:97,"AL;A",339741696,16\r\n' +
        '1:130,0:98,"ALHA",75514880,16\r\n' +
        '1:131,0:98,"ALHOTA",75514944,16\r\n' +
        '1:132,0:98,"ALH;A",75514882,32\r\n' +
        '1:133,0:98,"ALHTA",75514882,16\r\n' +
        '1:134,0:99,"ALO",0,36\r\n' +
        '1:849,NULL,"ZDXA",339740672,32\r\n' +
        '1:135,0:100,"ALOMOS",0,24\r\n'
    );
    const expected =
      'Object.freeze([,' +
      'l(93,")kp",0,0),' +
      'l(94,")kr)",0,16),' +
      'l(95,")kt)",0,16),' +
      'l(96,")l)",0,100),' +
      'l(97,")l)",0,0),' +
      'l(97,")ly)",339741696,16),' +
      'l(98,")lh)",75514880,16),' +
      'l(98,")lhwt)",75514944,16),' +
      'l(98,")lhy)",75514882,32),' +
      'l(98,")lht)",75514882,16),' +
      'l(99,")lw",0,36),' +
      'l(null,"zdq)",339740672,32),' +
      'l(100,")lwmws",0,24)]);';
    strictEqual(js, expected, 'parsed lexemes');
  });
});

describe('Word', () => {
  it('Build Word Javascript', () => {
    const js = getWords(
      '2:1,1:2,"LABOH","LaAB,uOH",6883480,128\r\n' +
        '2:2,1:2,"LABOH;","LaAB,uOH_;",6883476,128\r\n' +
        '2:3,1:2,"LABOH;N","LaAB,uOHe;N",6883544,128\r\n' +
        '2:7,1:2,"LABOC","LaAB,uOC,",6883492,128\r\n' +
        '2:8,1:2,"LABOCON","LaAB,uOC,uON",6883556,128\r\n' +
        '2:9,NULL,"LABON","LaAB,uON",6883568,128\r\n' +
        '2:10,1:2,"LAB;","LoAB,;",6883504,128\r\n' +
        '2:11,1:3,"ABHOTA","AaB,oHuOT,oA",6914048,192\r\n' +
        '2:13,1:4,"ABHON","AeB\'HuON",6881492,128\r\n' +
        '2:14,1:4,"OABC;","OeAB\'eC,;",6882984,128\r\n' +
        '2:15,1:4,"ABA","AeB\'oA",6881280,320\r\n' +
        '2:20,1:5,"ABD","AoB,eD,",109772800,128\r\n' +
        '2:21,1:1742,"MYL","MeYuL",0,192\r\n' +
        '2:22,1:1518,"CL","C\'uL",0,0\r\n' +
        '2:23,1:3541,"RWNA","RiWoNoA",6881280,192\r\n' +
        '2:24,1:2854,"DXSR;A-DI;L;IOS","D\'XeSaRi;aA-D,I,i;Li;I\'oOS",1024,128\r\n'
    );
    const expected =
      'Object.freeze([,' +
      'w(2,"l)bwh","la)b,wuh",6883480,128),' +
      'w(2,"l)bwhy","la)b,wuh_y",6883476,128),' +
      'w(2,"l)bwhyn","la)b,wuhyen",6883544,128),' +
      ',,,' +
      'w(2,"l)bwk","la)b,wuk,",6883492,128),' +
      'w(2,"l)bwkwn","la)b,wuk,wun",6883556,128),' +
      'w(null,"l)bwn","la)b,wun",6883568,128),' +
      'w(2,"l)by","lo)b,y",6883504,128),' +
      'w(3,")bhwt)",")ab,ohwut,o)",6914048,192),' +
      ',' +
      'w(4,")bhwn",")eb\'hwun",6881492,128),' +
      'w(4,"w)bky","we)b\'ek,y",6882984,128),' +
      'w(4,")b)",")eb\'o)",6881280,320),' +
      ',,,,' +
      'w(5,")bd",")ob,ed,",109772800,128),' +
      'w(1742,"mTl","meTul",0,192),' +
      'w(1518,"kl","k\'ul",0,0),' +
      'w(3541,"r$n)","ri$ono)",6881280,192),' +
      'w(2854,"dqsry)-dpylypws","d\'qesariya)-d,p,yilyip\'wOs",1024,128)]);';
    strictEqual(js.words, expected, 'parsed words');
    strictEqual(js.noY, 'Object.freeze([23,24]);', 'noY words');
    strictEqual(js.noW, 'Object.freeze([21,22]);', 'noW words');
  });
});

describe('English', () => {
  it('Parse English File', () => {
    const parse = getEnglish(
      '3:14,1:7,"lost","","","",0,0\r\n' +
        '3:15,NULL,"perishing","","","",0,0\r\n' +
        '3:16,1:8,"pipe","","","",0,0\r\n' +
        '3:17,1:8,"flute","","","",0,0\r\n' +
        '3:18,1:9,"Abijah","","","(son of Rehoboam)",2,0\r\n' +
        '3:19,1:10,"Abijah","","","(founder of a course of priests)",2,0\r\n' +
        '3:20,1:11,"Abiud","","","",0,0\r\n' +
        '3:21,1:12,"Abilene","","","",0,0\r\n' +
        '3:22,1:13,"Abiathar","","","",0,0\r\n' +
        '3:23,1:14,"mourner","","","",0,0\r\n' +
        '3:24,1:15,"grieve","","","",4096,0\r\n' +
        '3:25,1:15,"mourn","","","",4096,0\r\n' +
        '3:26,1:16,"mourning","","","",0,0\r\n' +
        '3:27,1:16,"grief","","","",0,0\r\n' +
        '3:28,1:16,"sadness","","","",0,0\r\n' +
        '3:29,1:17,"stone","","","",0,0\r\n' +
        '3:30,1:18,"Abraham","","","",0,0\r\n' +
        '3:31,NULL,"Abram","","","",-234,1\r\n' +
        '3:124,1:71,"kindle","","","w/ &NuORoA& ",10240,0\r\n' +
        '3:131,1:74,"near","","","w/ &EaL&",0,0\r\n' +
        '3:1895,1:1088,"Taverns","The Three","","w/ &T\'LoT,&",0,0\r\n' +
        '3:2717,1:1522,"each one","","","",0,0\r\n' +
        '3:2718,NULL,"each and every one","","","(*CL-KD___KD*) ",0,0\r\n' +
        '3:4733,1:2716,"break","","out against","w/ &EaL& ",8208,0\r\n'
    );
    const expected =
      'Object.freeze([,' +
      'e(7,"lost","","","",0,false),' +
      'e(7,"perishing","","","",0,false),' +
      'e(8,"pipe","","","",0,false),' +
      'e(8,"flute","","","",0,false),' +
      'e(9,"Abijah","","","(son of Rehoboam)",2,false),' +
      'e(10,"Abijah","","","(founder of a course of priests)",2,false),' +
      'e(11,"Abiud","","","",0,false),' +
      'e(12,"Abilene","","","",0,false),' +
      'e(13,"Abiathar","","","",0,false),' +
      'e(14,"mourner","","","",0,false),' +
      'e(15,"grieve","","","",4096,false),' +
      'e(15,"mourn","","","",4096,false),' +
      'e(16,"mourning","","","",0,false),' +
      'e(16,"grief","","","",0,false),' +
      'e(16,"sadness","","","",0,false),' +
      'e(17,"stone","","","",0,false),' +
      'e(18,"Abraham","","","",0,false),' +
      'e(18,"Abram","","","",-234,true),' +
      'e(71,"kindle","","","w/ &nwuro)&",10240,false),' +
      'e(74,"near","","","w/ &(al&",0,false),' +
      'e(1088,"Taverns","The Three","","w/ &t\'lot,&",0,false),' +
      'e(1522,"each one","","","",0,false),' +
      'e(1522,"each and every one","","","(*kl-xd___xd*)",0,false),' +
      'e(2716,"break","","out against","w/ &(al&",8208,false)]);';
    strictEqual(parse.english, expected, 'parsed english');
    const lids =
      'Object.freeze({7:[14,15],8:[16,17],9:[18],10:[19],11:[20],12:[21],13:[22],14:[23],15:[24,25],16:[26,27,28],17:[29],18:[30,31],71:[124],74:[131],1088:[1895],1522:[2717,2718],2716:[4733]});';
    strictEqual(parse.lids, lids, 'lids');
  });
});

describe('Etymology', () => {
  it('Parse Etymology File', () => {
    const parse = getEtymology(
      '4:1,1:1,"a\\255h\\256r",5\r\n' +
        '4:2,1:20,"a\\255gc\\256n",5\r\n' +
        '4:3,1:22,"a\\255gro\\256w",5\r\n' +
        '4:4,1:36,"ei\\310dow",5\r\n' +
        '4:5,1:46,"eu\\255jaristi\\256a",5\r\n' +
        '4:6,1:50,"eu\\255agge\\256lion",5\r\n' +
        '4:7,1:53,"o\\261gkinow",5\r\n' +
        '4:8,1:57,"eu\\255roklu\\256dcn",5\r\n' +
        '4:9,1:61,"64.000000",6\r\n' +
        '4:10,1:75,"eu\\310",5\r\n' +
        '4:11,1:77,"86.000000",8\r\n' +
        '4:12,1:1797,"me\\256n",5\r\n' +
        '4:13,1:97,"ei\\255k\\224\\264",5\r\n' +
        '4:14,1:106,"e\\261jidna",5\r\n' +
        '4:15,1:119,"o\\261jlow",5\r\n' +
        '4:16,1:122,"xe\\256now",5\r\n' +
        '4:17,1:161,"a\\255me\\256yustow",5\r\n' +
        '4:19,1:191,"a\\255na\\256gkh",5\r\n' +
        '4:20,1:198,"a\\255nyu\\256patow",5\r\n' +
        '4:21,NULL,"409.000000",8\r\n' +
        '4:22,1:859,"zeu\\264gos",5\r\n'
    );
    const expected =
      'Object.freeze([,' +
      't(1,"a\\\\255h\\\\256r",5),' +
      't(20,"a\\\\255gc\\\\256n",5),' +
      't(22,"a\\\\255gro\\\\256w",5),' +
      't(36,"ei\\\\310dow",5),' +
      't(46,"eu\\\\255jaristi\\\\256a",5),' +
      't(50,"eu\\\\255agge\\\\256lion",5),' +
      't(53,"o\\\\261gkinow",5),' +
      't(57,"eu\\\\255roklu\\\\256dcn",5),' +
      't(61,"64.000000",6),' +
      't(75,"eu\\\\310",5),' +
      't(77,"86.000000",8),' +
      't(1797,"me\\\\256n",5),' +
      't(97,"ei\\\\255k\\\\224\\\\264",5),' +
      't(106,"e\\\\261jidna",5),' +
      't(119,"o\\\\261jlow",5),' +
      't(122,"xe\\\\256now",5),' +
      't(161,"a\\\\255me\\\\256yustow",5),' +
      ',' +
      't(191,"a\\\\255na\\\\256gkh",5),' +
      't(198,"a\\\\255nyu\\\\256patow",5),' +
      't(null,"409.000000",8),' +
      't(859,"zeu\\\\264gos",5)' +
      ']);';
    strictEqual(parse.etymology, expected, 'parsed etymology');
    const lids =
      'Object.freeze({1:1,20:2,22:3,36:4,46:5,50:6,53:7,57:8,61:9,75:10,77:11,97:13,106:14,119:15,122:16,161:17,191:19,198:20,859:22,1797:12});';
    strictEqual(parse.lids, lids, 'lids');
  });
});

describe('BFBS/UBS', () => {
  it('Parse BFBS/UBS File', () => {
    const js = getUbs(
      '0:1,520100101,33565194,64\r\n' +
        '0:2,520100102,33563576,0\r\n' +
        '0:3,520100103,33564000,0\r\n' +
        '0:4,520100104,33566955,16\r\n' +
        '0:5,520100105,33557677,0\r\n' +
        '0:6,520100106,33558659,24\r\n' +
        '0:7,520100107,33557677,0\r\n' +
        '0:8,520100108,33554599,36\r\n' +
        '0:9,520100201,33554597,0\r\n' +
        '0:-32628,541601508,33567919,0\r\n' +
        '0:-32627,541601509,33572533,0\r\n' +
        '0:-32626,541601510,33557662,-28672\r\n' +
        '0:-32625,541601511,33555860,4100\r\n' +
        '0:-32624,541601512,33555337,0\r\n' +
        '0:-32623,541601513,33558837,0\r\n' +
        '0:-32622,541601514,33563118,0\r\n' +
        '0:-32621,541601515,33565392,-32764\r\n' +
        '0:-32620,541601516,33565838,0\r\n' +
        '0:-32619,541601517,33574171,0\r\n' +
        '0:-32618,541601518,33557095,0\r\n' +
        '0:-32617,541601519,33555871,-32752\r\n'
    );
    let expected =
      '{52:{1:{1:[10762,9144,9568,12523,3245,4227,3245,167],2:[165],verses:2,words:9,rollupChapters:0,rollupVerses:0,rollupWords:0},chapters:1,verses:2,words:9,rollupBooks:0,rollupChapters:0,rollupVerses:0,rollupWords:0},54:{16:{15:[null,null,null,null,null,null,null,13487,18101,3230,1428,905,4405,8686,10960,11406,19739,2663,1439],verses:1,words:12,rollupChapters:1,rollupVerses:2,rollupWords:9},chapters:1,verses:1,words:12,rollupBooks:1,rollupChapters:1,rollupVerses:2,rollupWords:9},books:2,chapters:2,verses:3,words:21};';
    strictEqual(js.ubs, expected, 'parsed Ubs');

    expected = '[[52,1,0],[52,1,1],[52,1,2],[54,16,0],[54,16,15]];';
    strictEqual(js.reference, expected, 'parsed Reference');
  });
});
