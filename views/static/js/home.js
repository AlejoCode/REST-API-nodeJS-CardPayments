$( document ).ready(function() {

    //on page load list Cards ------------START
    $.ajax({
        url: "cardTokens/list",
        dataType: "json",
    })
    .done((data) => {
        if(data) {

            var odata = $.parseJSON(JSON.stringify(data.docs));
            odata.forEach(item => {
                $('#myTableCard > tbody:last-child').append(getRowHtmlCard(item));
            });
        }
    })
    .fail((err) => {
        console.log("Error");
    });  

    //on page load list Payments ------------START
    $.ajax({
        url: "payments/list",
        dataType: "json",
    })
    .done((data) => {
        if(data) {

            var odata = $.parseJSON(JSON.stringify(data.docs));
            odata.forEach(item => {
                $('#myTablePayment > tbody:last-child').append(getRowHtmlPayment(item));
            });
        }
    })
    .fail((err) => {
        console.log("Error");
    });  
    
    
    //on add Payment submit the form----------------------------START
    $("#btnSubmitPayment").click (() => {
        $("#addPaymentForm").submit();
    });

	$(document).on("submit", '#addPaymentForm', function(event) {
		event.preventDefault(); 
		var $form = $(this);
		
        $.ajax({
            url: 'payments/add',
            data: $form.serializeArray(),
            type: 'POST'
        })
        .done((data) => {
            if(data) {
                var odata = $.parseJSON(JSON.stringify(data.docs));
                odata.forEach(item => {
                    $('#myTablePayment > tbody:last-child').append(getRowHtmlPayment(item));
                });
                $('#addPaymentForm').trigger("reset");
            }
        })
        .fail((err) => {
            console.log("Error");
        });
    });	  
    //-------------------------------------------------------END

        //on add Payment submit the form----------------------------START
        $("#btnSubmitCard").click (() => {
            $("#addCardForm").submit();
        });
    
        $(document).on("submit", '#addCardForm', function(event) {
            event.preventDefault(); 
            var $form = $(this);
            
            $.ajax({
                url: 'cardTokens/add',
                data: $form.serializeArray(),
                type: 'POST'
            })
            .done((data) => {
                if(data) {
                    var odata = $.parseJSON(JSON.stringify(data.docs));
                    odata.forEach(item => {
                        $('#myTableCard > tbody:last-child').append(getRowHtmlCard(item));
                    });
                    $('#addCardForm').trigger("reset");
                }
            })
            .fail((err) => {
                console.log("Error");
            });
        });	  
        //-------------------------------------------------------END
    //on click of delete Payment----------------------------START
    $(document).on("click", ".btn-del-payment", function(event) { 

        //identify the row which we will remove from our table.
        var row = $(this).parent().parent();

        $.ajax({
            url: 'payments/reverse',
            data: { id:this.id },
            type: 'POST'
        })
        .done((data) => {
            if(data) {
                var odata = $.parseJSON(JSON.stringify(data.docs));
                odata.forEach(item => {
                    $('#myTablePayment > tbody:last-child').append(getRowHtmlPayment(item));
                });
            }
        })
        .fail((err) => {
            console.log("Error");
        });
    });	
    //-------------------------------------------------------END
});

function getRowHtmlCard(item) {
    
    var thtml =  getTD(item._id) 
                + getTD(item.cardNumber) 
                + getTD(item.securityCode) 
                + getTD(item.dueDate)
                + getTD(item.cardHolder)
                + getTD(item.cardHolderTypeId)
                + getTD(item.cardHolderNumberId)

                
    thtml = getTR(thtml);
    return thtml;
}

function getRowHtmlPayment(item) {
    
    var thtml =  getTD(item.name) 
                + getTD(item.email) 
                + getTD(item.description) 
                + getTD(item.amount)
                + getTD(item.cardToken)
                + getTD(item.numberFees)
                + getTD(item.paymentMethod)
                + getTD(item.referenceNumber)
                + getTD(item.status)
                + getTDBtnPayment(item._id)                
    thtml = getTR(thtml);
    return thtml;
}

function getTD(val) {
    return '<td>'+ val + '</td>';
}

function getTR(val) {
    return '<tr>'+ val + '</tr>';
}
function getTDBtnPayment(val) {
    return '<td><button type="button" id='+ val +' class="btn btn-default btn-sm btn-del-payment"><span class="fa fa-trash-alt" style="color:red; font-size:17px"></span> </button></td>';
}