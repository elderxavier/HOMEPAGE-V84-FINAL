

//ancora menu
function ancora_menu(){
	setTimeout(function(){ 
	      $('#classificados-link').click(function(evt){      	      								
					window.open('http://v8class.com.br', '_blank');
			});

	      	$('.link-home').click(function(evt){      	      				
					$('html, body').animate({ scrollTop: $('#home').offset().top - 148}, 1700);			
					evt.preventDefault();					
					
			});
	      	$('.link-institucional').click(function(evt){      	      				
					$('html, body').animate({ scrollTop: $('#institucional').offset().top - 148}, 1700);			
					evt.preventDefault();					
					
			});
			$('.link-solicitante').click(function(evt){      	      				
					$('html, body').animate({ scrollTop: $('#solicitante').offset().top - 148}, 1700);			
					evt.preventDefault();					
					
			});
			$('.link-parceiro').click(function(evt){      	      				
					$('html, body').animate({ scrollTop: $('#parceiro').offset().top - 148}, 1700);			
					evt.preventDefault();									
			});
			$('.link-contato').click(function(evt){      	      				
					$('html, body').animate({ scrollTop: $('#contato').offset().top - 148}, 1700);			
					evt.preventDefault();									
			});      
		}, 3000);
	/*
	$('#menu a, #escolha .box a').click(function(evt){
	     var alvo = $(this).attr('href').split('#').pop();
      $('html, body').animate({scrollTop: $('#'+alvo).offset().top - 148 }, 1700);      
      evt.preventDefault();
   });
*/
}
function login(){
	$("#menu .login").click(function(e){
		e.preventDefault();

		if($("#login").data("estado") == "fechado"){
	      $("#login").fadeIn(300);
	      $("#login").data("estado", "aberto");

	    }else{
	      $("#login").fadeOut(300);
	      $("#login").data("estado", "fechado");
	    }

  });
}

function solicitante(){
	
	$("#open-foto-field2").click(function(e){
		$("#form_fotos02 #foto_field").click();
		e.preventDefault();
	});

	$("#sendSolicitacaoBtn").click(sendEmailSolicitacao);
}

function mascara(){
	$(".mask-data").mask("99/99/9999"); //data
	$(".mask-fone").mask("(99) 9999-9999"); //telefone
}

//preview imagem
function preview(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
  $('#preview_image').attr('src', e.target.result)};
  	reader.readAsDataURL(input.files[0]);
  }
}

//preview imagem
function preview_2(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
  $('#preview_image2').attr('src', e.target.result)};
  	reader.readAsDataURL(input.files[0]);
  }
}

// anexos em emails
var anexos02 = [];

$(function(){
	$("#form_fotos02 #foto_field").off('change').change(function(){
		$("#form_fotos02").submit();
		$("#preview02").append('<div class="preview-loader"></div>');
	});
});


function finishUploadImages02(result){
	if(result != 'error'){
		$("#preview02 .preview-loader").remove();
		$("#preview02").append('<img src="_temp/'+result+'">');
		anexos02.push(result);
	}
}

// envia o email
function sendEmailSolicitacao(){
	
	var holder = $("#solicitante-form-holder");

	$.ajax({
		type : 'POST',
		url  : 'data/EmailAnexo.send.php',
		data : {
			'nome'          : holder.find("#nome").val(),			
			'email'         : holder.find("#email").val(),			
			'telefone'      : holder.find("#telefone").val(),			
			'celular'       : holder.find("#celular").val(),			
			'estado'        : holder.find("#estado").val(),		
			'cidade'        : holder.find("#cidade").val(),		
			'bairro'        : holder.find("#bairro").val(),		
			'nacionalidade' : holder.find("#nacionalidade").val(),		
			'marca'         : holder.find("#marca").val(),		
			'modelo'        : holder.find("#modelo").val(),		
			'ano'           : holder.find("#ano").val(),		
			'tipo_peca'     : holder.find("#tipo_peca").val(),		
			'num_chassi'    : holder.find("#num_chassi").val(),		
			'num_peca'      : holder.find("#num_peca").val(),		
			'descricao'     : holder.find("#descricao").val(),
			'anexos02'      : anexos02
		},
		success : function(result){
			
			if(result != true){
				console.log(result);
				holder.find('#divResult').html(result);
			}
			else {		
				clearEmailSolicitacao();
				holder.find('#divResult').html('Sua solicitação foi enviada com sucesso.');
			}
		}

	});

}

function clearEmailSolicitacao(){
	
	var holder = $("#solicitante-form-holder");

	holder.find('input[type="text"], textarea').val('');			
	holder.find("select").prop('selectedIndex',0);
	anexos02 = [];
	$("#preview02").html('');
}



/**
 * Parceiros Email
 */

function sendEmailParceiro(){
	
	var holder = $("#parceiro-form-holder");
	
	$.ajax({
		type : 'POST',
		url  : 'data/EmailParceiro.send.php',
		data : {
			'empresa'       : holder.find("#empresa").val(),			
			'email'         : holder.find("#email").val(),			
			'site'          : holder.find("#site").val(),			
			'telefone'      : holder.find("#telefone").val(),			
			'celular'       : holder.find("#celular").val(),		
			'nextel'        : holder.find("#nextel").val(),		
			'redes_sociais' : holder.find("#redes_sociais").val(),		
			'estado'        : holder.find("#estado").val(),		
			'cidade'        : holder.find("#cidade").val(),		
			'bairro'        : holder.find("#bairro").val(),		
			'cep'           : holder.find("#cep").val(),		
			'endereco'      : holder.find("#endereco").val(),		
			'tipo_peca'     : holder.find("#tipo_peca").val()
		},
		success : function(result){
			
			if(result != true){
				console.log(result);
				holder.find('#divResult').html(result);
			}
			else {		
				clearEmailParceiro();
				holder.find('#divResult').html('Sua solicitação foi enviada com sucesso.');
			}
		}

	});
}

function clearEmailParceiro(){
	
	var holder = $("#parceiro-form-holder");

	holder.find('input[type="text"], textarea').val('');			
	holder.find("select").prop('selectedIndex',0);
}

$(function(){
	
	var holder = $("#parceiro-form-holder");

	holder.find('#sendBtn').click(sendEmailParceiro);
	holder.find('#clearBtn').click(clearEmailParceiro);

});



$(document).ready(function(){
	mascara();			
	solicitante();
	$("#menu-principal").menuMobile();					
	$('#kanji-menu span').mouseover(function(event){
		event.preventDefault(event);	
        $(".top-logos").animate({height: '40px'});
        $("#menu").animate({margin: '40px 0 0 0'});    	
	});

	$('#kanji-menu span').click(function(event){		
		event.preventDefault();	
		$(".top-logos").animate({height: '3px'});
        $("#menu").animate({margin: '1px 0px 0px 0px'});
   	});

    $('.facebook-2').mouseover(function(evt){
        $('.facebook-2 .social-toltip').css('display','block');            
        $('.facebook-2').css('opacity','1');
      });
    $('.facebook-2').mouseout(function(evt){
        $('.facebook-2 .social-toltip').css('display','none');         
      });

    $('.instagram').mouseover(function(evt){
        $('.instagram .social-toltip').css('display','block');      
      });
      $('.instagram').mouseout(function(evt){
        $('.instagram .social-toltip').css('display','none');       
      });

      $('.youtube').mouseover(function(evt){
        $('.youtube .social-toltip').css('display','block');         
      });
      $('.youtube').mouseout(function(evt){
        $('.youtube .social-toltip').css('display','none');         
      });

      $('.twitter').mouseover(function(evt){
        $('.twitter .social-toltip').css('display','block');       
      });
      $('.twitter').mouseout(function(evt){
        $('.twitter .social-toltip').css('display','none'); 
      });

      $('.v8class').click(function(evt){      	      				
				//$('html, body').animate({ scrollTop: $('.classificados-class table').offset().top - 148}, 1700);			
				//evt.preventDefault();					
				window.open('http://v8class.com.br', '_blank');
		});
      ancora_menu();


});

