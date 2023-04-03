// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract NFTWHITELISTED is ERC721Enumerable, Ownable {
  using Strings for uint256;
  string public baseURI;
  string public baseExtension = ".json";
  string public notRevealedUri;
  uint256 public cost = 100000000000000;
  uint256 public maxSupply = 100000;
  uint256 public maxMintAmount = 1;
  uint256 public nftPerAddressLimit = 1;
  uint256 public nftPerPRLimit = 5;
  address payable bank_account;  
  address payable bank_account2;
  bool public paused = false;
  bool public revealed = false;
  bool public onlyWhitelisted = true;
  /// total due to pr
  uint256 public PR_payable;
  address[] public whitelistedAddresses;
  mapping(address => uint256) public addressMintedBalance;
  mapping(uint256 => address) public minter;
  uint256 public n_minter;
  mapping(uint256 => address) public whitelist;
  mapping(address => address) public discoclub;
  /// mapping from the address of the minter to identify who is the address that invite it
  mapping(address => address) public inviter;
  uint256 public n_PR;
  //mapping friend and reward for each people inside the chain  -- inside welcome[address] put the address of each subject to obtain the result
  //mapping(address => uint256) public order;
  mapping(address => data) public welcome;
  struct data{

      address friend1;
      bool mintfriend1;
      address friend2;
      bool mintfriend2;
      uint256 money;

  }

  /// mapping for PR

  mapping(address => data_PR) public welcome_PR;
  struct data_PR{

      mapping(uint256 => mapping(address => bool )) network;
      mapping(address => uint256) find_add_pos;
      mapping(uint256=> address) address_list;
      /*address friend1;
      bool mintfriend1;

      address friend2;
      bool mintfriend2; */
     
      uint256 money;
      uint256 listed;
      uint256 minted;

  }


  uint256 public n_whitelisted = PR.length; ///must be equal to the length of PR
  address payable [] public PR;
  uint256 public ref_rew;


  // Function to receive Ether. msg.data must be empty
  receive() external payable {}

  // Fallback function is called when msg.data is not empty
  fallback() external payable {}
   

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI,
    string memory _initNotRevealedUri,
    uint256 temp_ref_rew,
    address payable [] memory _PR
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    setNotRevealedURI(_initNotRevealedUri);
    PR = _PR;    
    ref_rew = temp_ref_rew;
    n_PR = _PR.length;
    set_PR();
   
  }


  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;

    }

  function change_N_PR(uint256 new_N_PR) public onlyOwner{
    n_PR = new_N_PR;
  }

  function set_PR() public onlyOwner{
        for(uint256 i=0; i< n_PR; i++){
        whitelist[i]= address (PR[i]);
        welcome_PR[PR[i]].listed = 0;

        }

        n_whitelisted = n_PR;
    }

  function _PRpayable() private {
    uint256 _tempprpayable = 0;
    for (uint256 i = 0; i <n_PR ; i++){
      _tempprpayable = _tempprpayable + welcome_PR[PR[i]].money;
    }
    PR_payable = _tempprpayable;

  }


  // public
 function mint(uint256 _mintAmount,  address whitelisted1, address whitelisted2) public payable {
    require(!paused, "the contract is paused");
    uint256 supply = totalSupply();
    require(_mintAmount > 0, "need to mint at least 1 NFT");
    require(_mintAmount <= maxMintAmount, "max mint amount per session exceeded");
    require(supply + _mintAmount <= maxSupply, "max NFT limit exceeded");
    require(whitelisted1 != whitelisted2, "whitelisted addresses must be different");
    require(isWhitelisted(whitelisted1)== false, "first address is already whitelisted");
    require(isWhitelisted(whitelisted2) == false, "second address is already whitelisted");

    if (msg.sender != owner()) {
      if(onlyWhitelisted == true) {
            // IF MINTER IS A PR
           if(isPR(payable (msg.sender))){

            uint256 ownerMintedCount = addressMintedBalance[msg.sender];
            require(ownerMintedCount + _mintAmount <= nftPerPRLimit, "max NFT per PR exceed");
            
            // USING welcome_PR for PR Minter
            // _listed_temp IS THE NUMBER OF LISTED ADDRESS for each PR
            uint256 _listed_temp = welcome_PR[msg.sender].listed;
            /// INSERT THE WHITELISTED ADDRESSES INTO THE FIRST TWO SLOW AVAIABLE

            welcome_PR[msg.sender].network[_listed_temp][whitelisted1] = false;
            welcome_PR[msg.sender].find_add_pos[whitelisted1] = _listed_temp;
            welcome_PR[msg.sender].network[_listed_temp + 1][whitelisted2] = false;
            welcome_PR[msg.sender].find_add_pos[whitelisted2] = _listed_temp + 1;
            /// MOVE THE listed NUMBER OF ADDRESS
            welcome_PR[msg.sender].listed = _listed_temp +2;
            //// USE THE VARIABLE address_list TO MAP POSITION --> ADDRESS USED IN THE FUNCTION viewPRlisted
            welcome_PR[msg.sender].address_list[_listed_temp] = whitelisted1;
            welcome_PR[msg.sender].address_list[_listed_temp + 1] = whitelisted2;
            //use inviter mapping to come back to the mother address
            inviter[whitelisted1] = msg.sender;
            inviter[whitelisted2] = msg.sender;
       
           }
            
        }


     if (msg.sender != owner()) {
              //// IF MINTER IS NOT A PR
             if((isPR(payable(msg.sender)) == false)) {

                  require(msg.value >= cost * _mintAmount, "insufficient funds");
                  if(onlyWhitelisted == true) {
                      require(isWhitelisted(msg.sender), "user is not whitelisted");
                      uint256 ownerMintedCount = addressMintedBalance[msg.sender];
                      require(ownerMintedCount + _mintAmount <= nftPerAddressLimit, "max NFT per address exceeded");
                      
                  }

                // USING VARIABLE welcome FOR NOT PR 
                welcome[msg.sender] = data  ({

                        friend1 : whitelisted1,
                        mintfriend1: false, 
                        friend2 : whitelisted2,
                        mintfriend2: false,
                        money: 0 
                    }
                );       

             //use inviter mapping to come back to the mother address
            inviter[whitelisted1] = msg.sender;
            inviter[whitelisted2] = msg.sender;    

            /// ADDING MINTER TO PR
            welcome_PR[ discoclub[msg.sender]].minted =  welcome_PR[ discoclub[msg.sender]].minted +1;

            //// ADDING REWARD TO THE INVITER
            //// FOR PR
            uint256 temp_money = welcome[inviter[msg.sender]].money;
            if(isPR(payable(inviter[msg.sender])) == false){
                  welcome[inviter[msg.sender]].money = temp_money + ref_rew;

                  if(welcome[inviter[msg.sender]].friend1 == msg.sender){
                    welcome[inviter[msg.sender]].mintfriend1 = true;
                  }
                  if(welcome[inviter[msg.sender]].friend2 == msg.sender){
                    welcome[inviter[msg.sender]].mintfriend2 = true;
                   }
            }

            //// FOR NOT PR
            if(isPR(payable(inviter[msg.sender])) == true){
                  welcome_PR[inviter[msg.sender]].money = temp_money + ref_rew;
                  uint256 _p_ = welcome_PR[inviter[msg.sender]].find_add_pos[msg.sender];
                  welcome_PR[inviter[msg.sender]].network[_p_][msg.sender] = true;
                  // if the direct inviter is a PR -> add this to the number of minted here (otherwise when you use discoclub for not PR INVITER)
                   welcome_PR[inviter[msg.sender]].minted =  welcome_PR[inviter[msg.sender]].minted +1;
                    
                   
            }
           
        }

    }

    whitelist[n_whitelisted] = whitelisted1;
    whitelist[n_whitelisted + 1 ] = whitelisted2;
    bool test_1 =  isWhitelisted(whitelisted1);
    bool test_2 =  isWhitelisted(whitelisted2);
    if(isPR(payable (msg.sender))){
        if(test_1 == false){
              discoclub[whitelisted1 ] = msg.sender ;
        }

        if(test_2 == false){
            discoclub[whitelisted2] = msg.sender;
        }
    }else{
      address _PR = discoclub[msg.sender];

      if(test_1 == false){
              discoclub[whitelisted1 ] = _PR  ;
        }

        if(test_2 == false){
            discoclub[whitelisted2] = _PR ;
        }
    }


          
    n_whitelisted = n_whitelisted  + 2;

    for (uint256 i = 1; i <= _mintAmount; i++) {
      addressMintedBalance[msg.sender]++;
      _safeMint(msg.sender, supply + i);

      }

     minter[n_minter] = msg.sender;
     n_minter = n_minter +1;


    }

    _PRpayable();

  }


  ///function to view the list of address invited by a PR

  function viewPRlisted(address PR_) public view returns (address [] memory list){
    uint _p_ = welcome_PR[PR_].listed;
    for (uint i= 0; i<= _p_ ;i++){
      address _address_temp = welcome_PR[PR_].address_list[i];
      list[i] = _address_temp;
    }

    return list;


  }

  //// function to view a single address invited by a PR

    function singleviewPR(address PR_, uint256 num) public view returns(address){

        address _address_temp = welcome_PR[PR_].address_list[num];

        return(_address_temp);
    }


  ////// FUNCTION TO VIEW IF AN INVITED ADDRESS FROM PR MINTED OR NOT
  function viewmint(address pr, address whi) public view returns(bool){
    bool minted_;
    uint256 _pos = welcome_PR[pr].find_add_pos[whi];
    minted_ = welcome_PR[pr].network[_pos][whi];

    return( minted_);
  }


 //// FUNCTION TO RETIRE REWARD
  function retire_reward() public {
    if(isPR(payable(msg.sender)) == false){
          require(welcome[msg.sender].money > 0, "BRO you have nothing to retire");
          (bool hs, ) = payable(address(this)).call{value: welcome[msg.sender].money}("whidraw your reward...");
          require(hs);
          welcome[msg.sender].money = 0;
    } else if (isPR(payable (msg.sender))){
          require(welcome_PR[msg.sender].money > 0, "PR you have nothing to retire... GO TO WORK");
          (bool hs, ) = payable(address(this)).call{value: welcome_PR[msg.sender].money}("whidraw your reward...");
          require(hs);
          welcome_PR[msg.sender].money = 0;
    }

    _PRpayable();

  }

/*  function isWhitelisted(address _user) public view returns (bool) {
    for (uint i = 0; i < whitelistedAddresses.length; i++) {
      if (whitelistedAddresses[i] == _user) {
          return true;
      }
    }
    return false;
  }

*/

  function isPR (address payable user ) public view returns (bool ){
    uint256 g = 0;
    for(uint256 i =0 ; i< n_PR; i++){
        if(user == PR[i] ) {
          g = g + 1;
        }
    }
    if(g>0){
      return(true);
    } else{
      return(false);
    }

  }

  function change_N_WHITELIST(uint256 new_n_whitelisted) public onlyOwner{
    n_whitelisted = new_n_whitelisted;
  }




  function changePR(uint256 PR_pos , address payable newPR) public onlyOwner{
    PR[PR_pos] = newPR;
    whitelist[n_whitelisted] = newPR;
    n_whitelisted = n_whitelisted +1;
  }

  

  function change_ref_reward(uint256 new_reward) public onlyOwner{
      ref_rew = new_reward;
  }

  function countPR(address payable PRcount) public view returns (uint256 counted){
    uint256 counted_ = 0;
    address add_;
    address realPR;

    for (uint256 i = 0; i < n_whitelisted; i++){
        add_ = whitelist[i];
        realPR = discoclub[add_];
        if(payable(realPR) == PRcount){
        counted_ = counted_ +1;
        }
      counted = counted_;
    }
    return(counted);

  }

  function isWhitelisted(address _user) public view returns (bool) {
    for (uint i = 0; i < n_whitelisted; i++) {
      if (whitelist[i] == _user) {
          return true;
      }
    }
    return false;
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );
    
    if(revealed == false) {
        return notRevealedUri;
    }

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

  //only owner
  function reveal() public onlyOwner {
      revealed = true;
  }
  
  function setNftPerAddressLimit(uint256 _limit) public onlyOwner {
    nftPerAddressLimit = _limit;
  }
  
  function setNftPerPRLimit(uint256 _limit) public onlyOwner {
    nftPerPRLimit = _limit;
  }


  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }
  
  function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
    notRevealedUri = _notRevealedURI;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
  
  function setOnlyWhitelisted(bool _state) public onlyOwner {
    onlyWhitelisted = _state;
  }
  
  function renew_whitelistUser(address[] calldata _users) public onlyOwner {
    for (uint256 i = 0 ; i< n_whitelisted; i++){
      whitelist[i] = _users[i];
    }
    delete whitelistedAddresses;
    whitelistedAddresses = _users;
    n_whitelisted = _users.length;
  }


   function update_whitelist(address temp_add_1, address temp_add_2)public onlyOwner{
      
       whitelistedAddresses[n_whitelisted] = temp_add_1;
       whitelistedAddresses[n_whitelisted + 1] = temp_add_2;
       n_whitelisted = n_whitelisted +2;


   }
    

    
   function burn(uint256 ID) public  {

       _burn(ID);
   }

    function set_bank(address payable bank_receiver) public onlyOwner{
        bank_account = bank_receiver;
    }
    function view_bank () public view returns (address){

        return(bank_account);
    }
    
    function set_bank2(address payable bank_receiver) public onlyOwner{
        bank_account2 = bank_receiver;
    }
    function view_bank2 () public view returns (address){

        return(bank_account2);
    }

  

  function PR_exp_air(address _address) public view returns(uint256){
    uint256 amount = uint( (address(this).balance - PR_payable)*10/100);
    uint256 exp = amount * (welcome_PR[_address].minted / totalSupply());
    return(exp);

  }


  function PR_airdrop() public payable onlyOwner {
    // 10% of the smart contract will be sent
    // =============================================================================
    _PRpayable();
    uint256 amount = uint( (address(this).balance - PR_payable)*10/100);
    for(uint256 i=0; i< n_PR; i++){

        address _PR_address = PR[i];
        
        (bool hs, ) = payable(_PR_address).call{value:(amount * (welcome_PR[_PR_address].minted / totalSupply()))} ("");
        require(hs);
    }
  
  }

  function withdraw() public payable onlyOwner {
    // 50%% to the bank 1 account
    // =============================================================================
    (bool hs, ) = payable(bank_account).call{value: address(this).balance * 50 / 100}("");
    require(hs);
    // =============================================================================
    
    // 50% to the bank 2 account
    // Do not remove this otherwise you will not be able to withdraw the funds.
    // =============================================================================
    (bool os, ) = payable(bank_account2).call{value: address(this).balance}("");
    require(os);
    // =============================================================================
  }
}