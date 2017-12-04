<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    @import '../stylus/varibles.styl'
    .Rule 
        background #ffd535
        .header
            height 138px
            img 
                display block 
                width 100% 
                height 100%
        .detail 
            padding 0 15px  
            .sec 
                border-radius 5px
                border 1px solid #1c1414  
                background ruleSecBg
                position relative 
                margin-top 66px
                box-shadow -5px -5px 1px 0 #fffac7 , -6px -6px 1px 1px #1c1414 
                .sec-shadow  
                    position absolute
                    background ruleSecBg
                    border 1px solid #1c1414 
                .clip-wrapper 
                    position absolute
                    height 74px
                    top -68px
                    width 100%
                    .clip-left 
                        position absolute 
                        left 36px 
                    .clip-right 
                        position absolute 
                        right 36px    
                .title 
                    margin-top 15px
                    text-align center
                .word 
                    padding 18px 
                    font-size 12px 
                    color titleColor 
                    line-height 24px    
                    .active 
                        color ruleActiveColor
                        strong 
                            font-size 16px    
            .price 
                height 185px 
                margin-top 50px  
                position relative 
                box-shadow 0 0 0 transparent
                .price-title
                    position absolute 
                    left 50% 
                    top -19px
                    margin-left -91px
                .box-wrapper
                    margin-top 55px
                    height 74px
                    display flex
                    .box
                        flex 1
                        text-align center
                .tip 
                    font-size 12px 
                    margin-top 24px  
                    padding-left 30px   
                    color ruleTipColor    
            .participate
                height 185px
            .award
                padding-bottom 10px 
                .word 
                    line-height 20px 
                .demo
                    padding 0 15px 
                    margin-top 30px
                    height 216px    
                    display flex 
                    .lab 
                        flex 1 58px 0
                        font-size 12px 
                        color ruleActiveColor 
                        width 58px
            .handout 
                .word 
                    text-align center   
        .footer 
            height 108px
</style>

<template>
    <div class="Rule">
        <div class="header">
            <img src="../assets/img/rule-header.png" width="100%" height="100%">
        </div>
        <div class="detail">
            <div class="price sec">
                <img src="../assets/img/rule-price.png" width="182" height="38" class="price-title">
                <div class="box-wrapper">
                    <div class="box">
                        <img src="../assets/img/rule-qbi.png" width="73" height="74">
                    </div>
                    <div class="box">
                        <img src="../assets/img/rule-coupon.png" width="73" height="74">
                    </div>
                    <div class="box">
                        <img src="../assets/img/rule-money.png" width="73" height="74">
                    </div>    
                </div>
                <div class="tip">
                    提示：优惠券仅限电竞帮app用户端使用。
                </div>
            </div>
            <div class="participate sec">
                <div class="clip-wrapper">
                    <img src="../assets/img/clip.png" width="35" height="74" class="clip-left">
                    <img src="../assets/img/clip.png" width="35" height="74" class="clip-right">
                </div>
                <div class="title">
                    <img src="../assets/img/participate.png" width="180" height="32">
                </div>
                <div class="word">
                    进入电竞帮吃鸡组队大厅，点击<span class="active">创建房间</span>，等待玩家组团后开始游戏。取得<span class="active">首次</span>吃鸡胜利后队长可获得<span class="active"><strong>5</strong>元Q币</span>，其它队员可获得<span class="active"><strong>5</strong>元优惠券</span>。所有参与活动的玩家都有机会获得<span class="active"><strong>200</strong>元现金奖励</span>。
                </div>
            </div>           
            <div class="award sec">
                <div class="clip-wrapper">
                    <img src="../assets/img/clip.png" width="35" height="74" class="clip-left">
                    <img src="../assets/img/clip.png" width="35" height="74" class="clip-right">
                </div>
                <div class="title">
                    <img src="../assets/img/award.png" width="180" height="32">
                </div>
                <div class="word">
                    活动期间内，参与电竞帮组团吃鸡活动并取得首次吃鸡胜利后，队长和队员自行<span class="active">QQ联系电竞帮官方客服</span>（QQ号：<a href="mqqwpa://im/chat?chat_type=wpa&uin=1198254065&version=1&src_type=web&web_src=oicqzone.com" class="active">1198254065</a>），提供首次吃鸡胜利的<span class="active">游戏截图</span>（截图需要包括终结者游戏中的游戏id，最终成绩，游戏时间，以及所有队友）。除了截图，请提供电竞帮用户端app的手机账号，电竞帮app昵称，终结者游戏昵称，QQ号，队伍属性（队长还是队友）。
                </div>
                <div class="demo">
                    <div class="lab">
                        示例图：
                    </div>
                    <div class="demo-img">
                        <img src="../assets/img/demo.png" width="120" height="214">
                    </div>
                </div>
            </div>
            <div class="handout sec">
                <div class="clip-wrapper">
                    <img src="../assets/img/clip.png" width="35" height="74" class="clip-left">
                    <img src="../assets/img/clip.png" width="35" height="74" class="clip-right">
                </div>
                <div class="title">
                    <img src="../assets/img/time.png" width="180" height="32">
                </div>
                <div class="word">
                    Q币和优惠券奖励将在客服核实兑奖信息后的<span class="active">3个工作日</span>内发放。200元现金奖励将在活动结束后的<span class="active">1周内</span>进行发放。
                </div>
            </div>
            <div class="friendship sec">
                <div class="clip-wrapper">
                    <img src="../assets/img/clip.png" width="35" height="74" class="clip-left">
                    <img src="../assets/img/clip.png" width="35" height="74" class="clip-right">
                </div>
                <div class="title">
                    <img src="../assets/img/friendship.png" width="180" height="32">
                </div>
                <div class="word">
                    <p>
                        1）完成整个活动流程，需要玩家点击<span class="active">“开始游戏”</span>和<span class="active">“结束游戏”</span>的按钮，<span class="active">请记得都要点击哟~</span>
                    </p>
                    <p>
                        2）单个玩家在活动期间内最多可以获得1张5元优惠券和5元Q币。
                    </p>
                    <p>
                        3）带队吃鸡获得胜利次数越多，越有机会获得200元现金奖励。
                    </p>
                    <p>
                        4）本次活动最终解释权归电竞帮所有。
                    </p>
                    <p>
                        5）如发现任何违规套取奖励行为，如刷单等将视情节严重程度进行判罚，包括且不限于以下手段：不予发放奖励、追回所发放奖励、依法追究其法律责任
                    </p>
                </div>
            </div>
        </div>
        <div class="footer">
            <img src="../assets/img/rule-footer.png" height="100%" width="100%">
        </div>
    </div>
</template>

<script>

export default {
    name: "Rule",
    data() {
        return {
            
        };
    },
    computed:{
        
    },
    methods: {
        
    }
};
</script>