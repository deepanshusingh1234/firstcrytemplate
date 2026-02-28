// app/faq/page.tsx
import React from 'react';

const FAQPage = () => {
    return (
        <div className="static_con w-full">
            <div className="maincontentArea max-w-[1366px] mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="head_con text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">F.A.Q.s</h1>
                    <div className="midarr w-16 h-1 bg-gray-300 mx-auto mt-2"></div>
                </div>

                {/* Main Content */}
                <div className="staticpagecontent mt-[-35px]">
                    <div className="staticpagecontentinner w-full text-justify text-gray-700 space-y-4">
                        <div>
                            <b className="text-gray-900">What is Firstcry?</b>
                            <p className="mt-1">Firstcry is Asia&apos;s largest online store for baby and kids products. We cater to the needs of our buyers (mothers buying for their kids) from before the kid is born upto his/her early teens.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">What is the benefit of buying from Firstcry?</b>
                            <p className="mt-1">Our company philosophy is pretty simple: We want to offer the best possible deal for our customers for the products that we all want to buy for our children. Our endeavour is to ensure that you get the widest possible choice of top rated brands and products at the best possible price anywhere in India combined with best possible service and timely delivery of products at your doorstep.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">Where are the offices of FirstCry located?</b>
                            <p className="mt-1">Currently our office is located in Pune while the orders are shipped from our warehouses located across India.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">What products does Firstcry sell?</b>
                            <p className="mt-1">We sell products of all the leading brands for babies and kids across sections right from diapers, baby food, infant accessories, gears (strollers, high chairs),nursery furniture, clothes & footwear to toys and school products. We also stock items from some of the leading importers and domestic manufacturers of the country. The items undergo a thorough check by our QA team before they are stocked.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">What&apos;s the minimum order value required to place an order?</b>
                            <p className="mt-1">To place an order, a minimum order value of Rs. 99 or more is required (Excluding COD charges, Shipping charges, or value reduced after the application of coupons or any other offer).</p>
                        </div>

                        <div>
                            <b className="text-gray-900">How do I know my order has been confirmed?</b>
                            <p className="mt-1">After checking out during the payment process, you will get a confirmation that your payment has been processed successfully. You will also get a mail in your registered email id, along with an SMS to your registered mobile number confirming the order.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">How do I check my order status?</b>
                            <p className="mt-1">We will ship your package within 24 hours of receiving the order. We will also mail you the name of the courier company and the tracking number of your consignment to your registered email address. You will receive an SMS about the same. In case you do not receive an email from us within 24 hours of placing an order please check your spam folder. Tracking may not appear online for up to another 24 hours in some cases, so please wait until your package is scanned by the courier company. Alternatively, you can check the same in My Account page, where Track Shipment option gives you the current status of your order being shipped.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">Is it safe to use my Credit Card Online at Firstcry.com?</b>
                            <p className="mt-1">We accept VISA, MASTER, AMERICAN EXPRESS and DINERS Credit Cards issued in India and Debit cards of all banks issued in India. International credit/debit card issues by most of the popular card&apos;s networks are also accepted. So, now you can place orders with Firstcry from outside India and we will ship it to your dear ones in India. All your transactions online are protected & secured by SSL (secure socket layer) technology from GoDaddy.com. It encrypts your credit card and relevant information during the entire transaction process. This encryption makes your shopping experience safe and secure.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">What if an item is out of stock?</b>
                            <p className="mt-1">We make every effort to keep all products in stock. However, there may be times when unexpected demands exceed our supply. We will notify you at the time of check out if the item selected is not in stock. In the rare circumstance where the order has been accepted and due to some reasons we are not able to ship, we will notify you within 24 hours and the money will be returned to you in the same mode by which the payment was made within 10 working days. Some items (which are restocked regularly) and is temporarily out of stock may appear on display with an out of stock tag. You can use the Notify Me option and we will inform you once the product is replenished and available for sale.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">Are there any other hidden charges like Octroi or Entry tax?</b>
                            <p className="mt-1">You will get the final price during check out. Our prices are all inclusive and you need not pay anything extra.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">How are the products packaged?</b>
                            <p className="mt-1">Each of the individual products are securely packaged in bubble wrap and put into a box. The box is sealed well ensuring a safe delivery to your doorstep.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">Do you&apos;ll provide customer call service outside India?</b>
                            <p className="mt-1">Currently, we do not provide Customer call service outside India. If you are an international customer with any order or service-related queries you can reach us at - <a href="mailto:customercare@firstcry.com" target="_blank" className="sv_cnt text-blue-600 hover:underline">customercare@firstcry.com</a></p>
                        </div>

                        <div>
                            <b className="text-gray-900">Can I register using an International Phone number?</b>
                            <p className="mt-1">Yes! You can register using an international phone number.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">If I have registered using an international Phone number can I use my club membership to shop offline at the Firstcry Stores?</b>
                            <p className="mt-1">Currently, you can not use your club membership at offline Firstcry stores if you have linked it to an international phone number. However, you can avail of the club discounts at the Firstcry app (Android or IOS) and website - <a href="https://www.firstcry.com" target="_blank" className="sv_cnt text-blue-600 hover:underline">www.firstcry.com</a> & <a href="https://www.firstcry.ae" target="_blank" className="sv_cnt text-blue-600 hover:underline">https://www.firstcry.ae</a></p>
                        </div>

                        <div>
                            <b className="text-gray-900">Do you&apos;ll deliver products outside India?</b>
                            <p className="mt-1">Other than India (<a href="https://www.firstcry.com" target="_blank" className="sv_cnt text-blue-600 hover:underline">https://www.firstcry.com</a>), we also have our presence in UAE with site domain being : <a href="https://www.firstcry.ae" target="_blank" className="sv_cnt text-blue-600 hover:underline">https://www.firstcry.ae</a>. However, both these sites are accessible to all and we do take orders from around the world provided the Orders shipping address from the respective site has to be of that country specific i.e. India or UAE.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">Is it mandatory to register before placing an order?</b>
                            <p className="mt-1">Yes, it is mandatory to register before placing an order on FirstCry. You can create an account on FirstCry by entering and verifying your email ID and phone number. You can choose to login via Facebook/Google account to place an order on FirstCry. It is recommended that you register with us in order to receive timely offers and also to maintain your Wishlist and account & address details.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">How long will it take to receive my orders?</b>
                            <p className="mt-1">For all areas serviced by reputed couriers, the delivery time would be within 3 to 4 business days after dispatch (business days exclude Sundays and other holidays). However items weighing over 2 kilos may take a couple of days longer to reach. For other areas the products will be shipped through Indian Postal Service and may take 1-2 weeks depending on the location.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">Can I ship different items in my order to different shipping addresses?</b>
                            <p className="mt-1">We can only process one shipping address per order. So, if you would like to order several items and ship to different people, please treat these as separate orders.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">Who pays for the shipping charges?</b>
                            <p className="mt-1">We provide Free Shipping on all Orders above or equal to Rs. 699/- (Excluding COD charges, Shipping charges, Platform and convenience fee or value reduced after application of coupons or any other offer). For Orders below Rs. 699 (with exclusions as above), shipping charges of Rs. 50 will apply. On select pincodes and/or on select products, we may apply additional shipping costs irrespective of the order value.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">What is Platform and Convenience Fee?</b>
                            <p className="mt-1">FirstCry reserves the right to levy a Platform and Convenience charge on orders. Platform & Convenience fee is applied to help us continuously maintain and improve the hassle-free shopping and smooth fulfillment experience. This fee will not be subject to refund in the case of any form of item or order cancellation post-dispatch of the products.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">What is GST?</b>
                            <p className="mt-1">GST means Goods and Service Tax. It is a single indirect tax on the sale of goods and services throughout India. GST is applicable w.e.f. 1st July, 2017.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">How GST amount is calculated over and above the discounted price?</b>
                            <p className="mt-1">GST is calculated on the basis of rates mentioned under GST laws for each category of product, customer location and the applicable discount on the product at the time of purchase.<br />GST over and above the discounted price is applicable on products with discount of 19% and above. Please refer to <a href="//www.firstcry.com/termsofuse" target="_blank" className="sv_cnt text-blue-600 hover:underline">Terms of Use</a> for full details. The GST collected on the discounted price is duly deposited with the respective GST Authorities having jurisdiction or adjusted as per the applicable GST Act and Rules</p>
                        </div>

                        <div>
                            <b className="text-gray-900">Do I have to pay GST on purchase of Gift Certificate & Guaranteed Savings Offer?</b>
                            <p className="mt-1">No. GST is not charged from customers on buying Gift Certificates and Guaranteed Savings Offer.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">Will my GST amount be refunded on Order Cancellation and Returns?</b>
                            <p className="mt-1">Yes. GST amount collected will be returned to customer&apos;s source method at the time of Cancellation and Returns.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">What to do if GST amount on purchased products comes out to be more than the limit defined by the Govt.?</b>
                            <p className="mt-1">We are ready to share all details of GST for your kind perusal and would happily return your money back in case we found any excessive amount being charged due to miscalculation.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">What happens if I am not available at the time of delivery?</b>
                            <p className="mt-1">Our delivery partners will attempt to deliver the package thrice before it is returned back to our warehouse. Please provide your mobile number in the delivery address as it will help in making a faster delivery.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">What is your Replacement Policy?</b>
                            <p className="mt-1">To view the Replacement Policy applicable to each product, please visit the product/combo page that you wish to purchase.<br />The product is applicable for replacement within the specified window after the delivery of the product.</p>
                            <p className="mt-2">In case of replacement, the original product will be picked up. At the time of Pick up, certain products may be subjected to doorstep Quality Control Inspection. The Quality Control parameters like Same Brand, Style, Color, Size, No of pcs in the pack, Same Brand Box Packaging, Same Box packaging in No Damage condition(Resalable), No Missing accessories like laces, flower, bow, tie, etc., Security tag on garment, Used/Unused may be checked by the courier partner. If any of the parameters are not met, the Replacement request of the product may be put on hold. Please note, you can raise another Replacement request as long as the Replacement window for that product has not expired. Once the original product has been received at our Facility and the quality check has been carried out successfully, the replacement product will be shipped to you. Please note that the product should be unused, unwashed with all original tags intact and should be returned in the original packaging with a copy of the original invoice.</p>
                            <p className="mt-2">If the product is not eligible for a replacement after delivery due to any eligible reasons, such as that the product is out of stock, the return pickup for the product is unavailable, or any other similar reason, you may return the product within the specified window after the delivery of the product. The refund will be processed after a successful quality check of the returned product. For more details, click on <a href="//www.firstcry.com/returnpolicy" target="_blank" className="sv_cnt text-blue-600 hover:underline">Policy</a>.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">What options do I have while making payment?</b>
                            <p className="mt-1">We accept payments by debit or credit card and also through Net Banking.<br />
                                <b className="text-gray-900">Credit Cards & Debit Cards -</b> We accept VISA, MASTER, RUPAY, AMERICAN EXPRESS and DINERS Credit Cards issued in India and we accept Debit cards of all banks issued in India. International credit/debit card issues by most of the popular card&apos;s networks are also accepted.<br />
                                <b className="text-gray-900">Net Banking - </b> We Accept HDFC Bank, SBI Bank, ICICI Bank, Kotak Mahindra Bank, Indian Overseas Bank, Yes Bank, Standard Chartered Bank, City Union Bank, Axis Bank. The Net Banking payment option is only available on orders above Rs. 2000. <br />
                                <b className="text-gray-900">Cash On Delivery (C-O-D) </b>- You can also pay through Cash On Delivery (COD). In this case you pay in Cash to the courier person while accepting the goods. COD payments would be accepted for orders with total invoice value greater than equal to Rs. 99/- and up to Rs. 10,000/-.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">Cash On Delivery Charges:</b>
                            <p className="mt-1">A nominal fee will be applied on Cash on Delivery (COD) orders. This fee may vary depending on factors such as your order value* and your purchase history. The exact COD charges will be displayed during checkout, allowing you to review them before confirming your order.<br />FirstCry has the right to modify the COD charges.<br />*Order Value is calculated as the total value of the products in your cart, excluding the COD charges, shipping charges, or any reductions from coupons or other offers.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">What is Quality Control Inspection at doorstep?</b>
                            <p className="mt-1">Once you raise a Return/Exchange/Replacement request, we will ensure a quick, easy and seamless returns experience for you. Our courier partner may perform a simple quality check at your doorstep and will check certain parameters like Same Brand, Style, Color, Size, No of pcs in the pack, Same Brand Box Packaging, Same Box packaging in No Damage condition(Resalable), No Missing accessories like laces, flower, bow, tie, etc., Security tag on garment, Used/Unused. Upon acceptance of the return, your return/ Exchange/ Replacement request will be approved. If any of the parameters are not met, the return/ Exchange/ Replacement request of the product may be put on hold. Please note, you can raise another request as long as the Return/ Exchange/ Replacement window for that product has not expired.</p>
                        </div>

                        <div>
                            <b className="text-gray-900">What is Buy More Save More Offer?</b>
                            <p className="mt-1">Buy More Save More is an offer on FirstCry.com where, when users add specific products to their cart, they get the chance to receive an extra discount by adding certain other selected products.<br />The offer is only applied when two or more eligible products are added from the Buy More recommendation list to the cart.</p>
                        </div>

                        {/* Assembly Service F.A.Q.s */}
                        <div id="assembly-faq" className="mt-8">
                            <div className="Shopcar_pageHead border-b border-gray-300 pb-2 mb-4">
                                <ul className="shopcartpage_ul">
                                    <li className="shopcartpage_li_1 w-full md:w-[600px] pt-1 pl-0 font-bold text-lg">Assembly Service F.A.Q.s</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <b className="text-gray-900">1. What is FirstCry Assembly Service?</b>
                                    <p className="mt-1">Some products might require assistance of an expert during assembly of the product. FirstCry Assembly Service is a convenient way of availing such assistance from FirstCry.com through a simple procedure of order and scheduling technical assistance / service. FirstCry, hand-picks expert technicians post suitable background verification, product training and rigorous quality checks in order to assist our customers with high quality service during assembly of their products.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">2. How many types of Assembly Service are available with the product?</b>
                                    <p className="mt-1">There are two types of assembly services available with the product. One is <b>Door Step Assembly Service</b> where technician will visit customer and do the assembly of product and other is <b>Online Assembly Service</b> where Technicians will schedule online call with customer to provide online assistance to customer for assembly of product.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">3. How can I buy FirstCry Assembly Service?</b>
                                    <p className="mt-1">Currently Door Step Assembly and Online Assembly service is available on selected products and pincodes To check, whether Door Step / Online Assembly Service is available on your pincode or not, just enter your pincode on the product details page and look for Door Step / Online Assembly Service Check Box,if it is available then door step / Online assembly service checkbox will be visible otherwise it will not be shown. You may then select the FirstCry Assembly Service type checkbox as per your convenience before adding the product to cart to avail the FirstCry Assembly Service, the cost of doorstep Assembly Service is Rs. 149/- and cost of Online Assembly Service is Rs. 99/- .</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">4. How do I schedule an appointment for FirstCry Assembly Service Technician?</b>
                                    <p className="mt-1">Within 48 hours of the delivery of your product (with which you have purchased FirstCry Assembly Service), our technician will call you on your shipping mobile number in order to schedule an appointment for Assembly Service basis available slots. Technician will visit your shipping address for the assembly of your product at the scheduled time. Note - Appointment can be scheduled only between 9:00 AM to 7:00 PM, Monday - Saturday (excluding Regional / National Holidays).</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">5. Who can avail Online Assistance Assembly Service?</b>
                                    <p className="mt-1">Firstcry App users only can avail Online Assistance Assembly Service.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">6. Do I need to download any separate app to get video calls for online assembly service?</b>
                                    <p className="mt-1">You just need to download Firstcry App to get video calls for assembly service of product.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">7. How will I receive online call for assembly service?</b>
                                    <p className="mt-1">Our technician will initiate online calls for assembly service for product on the scheduled time slot for the same. You will receive call within the firstcry app.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">8. Will customers be able to initiate online call for assembly service?</b>
                                    <p className="mt-1">No, Only our technicians will be able to place online call for assembly service on the scheduled timeslot for the same.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">9. My location is not serviceable for Door Step FirstCry Assembly Service. What should I do?</b>
                                    <p className="mt-1">If your location is not serviceable for Door Step FirstCry Assembly Services, then you may opt for Online Assembly Service option for your location where our technician will connect with you online to provide assembly assistance for your product.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">10. What if I forgot to purchase FirstCry Assembly Service while placing the order?</b>
                                    <p className="mt-1">If you haven&apos;t purchased FirstCry Assembly Service while placing order, you have two option to purchase it later :<br />
                                        <span className="block ml-4 mt-1"><b>Option 1 :</b> If you have not purchased the FirstCry Assembly Service while placing your order, you may opt for the service later. We will send 2 SMS to your registered mobile number (post 1st day and 4th day of delivery of the product). You may reply YES to the SMS and the Assembly Service Order will be generated. The Assembly Service order generated, would be payable only in cash (if applicable) directly to the technician. The cost of the Assembly service is as shown on the respective product / combo page.</span>
                                        <span className="block ml-4 mt-1"><b>Option 2:</b> On Order Detail Page, there is a option to Buy Assembly Service against your respective product applicable for Assembly Service, from where you can purchase assembly service for the product at given point of time.</span>
                                    </p>
                                </div>

                                <div>
                                    <b className="text-gray-900">11. Can I reschedule the FirstCry Assembly Service?</b>
                                    <p className="mt-1">In some cases, Yes, basis technicians availability. When technician calls to schedule an appointment, you will get a SMS too from FirstCry.com regarding the schedule along with technician&apos;s mobile number. You may call the technician between 9:00 AM – 7:00 PM, (Monday to Saturday, excluding Regional / National Holidays) and can place a request to reschedule the service, the same can be accommodated by the technician basis his availability.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">12. What will happen if I do not answer or miss on answering technicians call?</b>
                                    <p className="mt-1">Technician will try to reach you 3 times in 3 consecutive working days. If you missed on answering all 3 calls, the service request would be cancelled. If you still need Assembly Service thereafter, you may place your request through <a href="//www.firstcry.com/contactus" target="_blank" className="sv_cnt text-blue-600 hover:underline">Contact Us</a>.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">13. What will happen if I have entered wrong / old contact number in my order?</b>
                                    <p className="mt-1">Technician will try to reach on the shipping number provided by you on the order. We will try to connect 3 times in 3 consecutive working days. If we won&apos;t be able to connect with you (basis wrong / old contact number), the service request would be cancelled. To avoid the same, you may inform us about your correct contact details in advance or you may request to raise a new Assembly Service request post cancellation through <a href="//www.firstcry.com/contactus" target="_blank" className="sv_cnt text-blue-600 hover:underline">Contact Us</a>.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">14. What is the procedure for cancellation of FirstCry Assembly Service? And refund thereafter.</b>
                                    <p className="mt-1">You can just login with the registered account & cancel the Assembly Service through &apos;Cancel&apos; link provided against specific Assembly Service on <a href="//www.firstcry.com/orderhistory" target="_blank" className="sv_cnt text-blue-600 hover:underline">Order Details</a> page. Applicable refund against the cancelled Assembly Service will be credited to your FirstCry <a href="//www.firstcry.com/cashInacc" target="_blank" className="sv_cnt text-blue-600 hover:underline">Cash in My Account section</a>. Cancellation against Assembly Service will not be applicable if the status of the Assembly Service is already Cancelled or Closed.<br />
                                        <b>Note</b> - If you already have initiated cancellation request for the product against which Assembly Service was purchased, Assembly Service too will be cancelled and cumulative amount of Product and Assembly Service will be credited to your FirstCry <a href="//www.firstcry.com/cashInacc" target="_blank" className="sv_cnt text-blue-600 hover:underline">Cash in My Account section</a>.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">15. Will I be able to update my assembly service type after purchase of specific assembly service?</b>
                                    <p className="mt-1">Yes, you may update assembly service type only from Online Assembly Service to Door Step Assembly Service viceaversa is not applicable.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">16. How can I update Online Assembly Service to Door Step Assembly Service ?</b>
                                    <p className="mt-1">You can update assembly service type from online to door step with the help of Customer Care team only if door step assembly service is available at customer&apos;s address where product which requires assembly service is delivered.</p>
                                </div>
                            </div>
                        </div>

                        {/* Saved Cards F.A.Q.s */}
                        <div className="mt-8">
                            <div className="Shopcar_pageHead border-b border-gray-300 pb-2 mb-4">
                                <ul className="shopcartpage_ul">
                                    <li className="shopcartpage_li_1 w-full md:w-[600px] pt-1 pl-0 font-bold text-lg">Saved Cards F.A.Q.s</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <b className="text-gray-900">1. What all information is saved on opting for save card functionality?</b>
                                    <p className="mt-1">Credit card number, card holder name and expiry date is saved in a secured vault on opting for save card functionality.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">2. Can I delete my saved cards?</b>
                                    <p className="mt-1">Yes, user can delete their saved card at any point of time from the checkout page. Alternatively, users can also delete the details of the saved cards from the payment details section on their My Profile page.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">3. What&apos;s the maximum number of cards that can be saved?</b>
                                    <p className="mt-1">User can save a maximum of 10 cards.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">4. How do I save my cards?</b>
                                    <p className="mt-1">Users may choose to save their card details by selecting the checkbox during the final payment on FirstCry. If opted, the card details provided by the user (including card number, cardholder name, and expiry date) will be securely stored in PCI DSS-compliant vault.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">5. How do I make payment using saved cards?</b>
                                    <p className="mt-1">User can view all his/her saved cards at checkout under the credit/debit cards tab. This information is protected behind login. User has to login to site in order to view the saved card details. Next step is to select one of the saved cards, provide CVV(selected bins*) and click on make payment button to complete the transaction. For tokanized cards, no cvv flow is also enabled. The No CVV transaction utilizes advanced tokenization and encryption technologies to securely store and manage users’ card details.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">6. Can I use a new card which is not yet saved for making payment?</b>
                                    <p className="mt-1">Yes, our system supports payments through both new and saved cards. In case you have a new card which is already not saved with us, then you can use the same as well for making payments.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">7. Is it mandatory to save cards?</b>
                                    <p className="mt-1">No, user can decide whether they want to save their card info or not.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">8. I am unable to view my saved cards in checkout?</b>
                                    <p className="mt-1">The user must have a registered account with FirstCry and must be logged in to view the saved card information on checkout.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">9. Can saved cards be used on mobile site and apps?</b>
                                    <p className="mt-1">Yes, users saved cards are linked to the registered email id and are accessible on FirstCry mobile site and Apps as well.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">10. Is it safe to save my cards on checkout?</b>
                                    <p className="mt-1">Your card information is saved in a Card Vault with Juspay, one of the leading PCI DSS (Payment Card Industry Data Security Standards) compliant payment service providers in India. Jupay uses world class encryption technology to securely share information between FirstCry and Juspay.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">11. What happens to saved expired cards?</b>
                                    <p className="mt-1">User will see clear messaging in checkout against the saved expired cards. User has to ideally delete these cards and add new cards for payment processing.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">12. Whom should I contact if I had opted for save card but my card information was not saved?</b>
                                    <p className="mt-1">Please visit our <a href="//www.firstcry.com/contactus" target="_blank" className="sv_cnt text-blue-600 hover:underline">Contact Us</a> page and drop your query details to our customer care team for further action.</p>
                                </div>
                            </div>
                        </div>

                        {/* Shop &apos;n&apos; Earn Club Cash F.A.Q.s */}
                        <div className="mt-8">
                            <div className="Shopcar_pageHead border-b border-gray-300 pb-2 mb-4">
                                <ul className="shopcartpage_ul">
                                    <li className="shopcartpage_li_1 w-full md:w-[600px] pt-1 pl-0 font-bold text-lg">Shop &apos;n&apos; Earn Club Cash F.A.Q.s</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <b className="text-gray-900">1. What is the Club Cash Program on products?</b>
                                    <p className="mt-1">The Club Cash Program on products is a special reward point system on Firstcry.com exclusive for Club members, where you may earn Club Cash on eligible products. Though non-club users may avail Club Cash through other Activities/Events, Club Cash earning on eligible products is exclusive for club members.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">2. How do I earn Club Cash on products?</b>
                                    <p className="mt-1">Go to Firstcry.com, become a Club member, and search for your favourite products. You will see the Club Cash available against the eligible products. On purchasing the product, the Club Cash for the product will be automatically added to your account within 48 hours of being successfully delivered to you.<br /> If you are purchasing at a FirstCry store, the store receipt will explicitly mention the Club Cash earned by you for that purchase. Club Cash is credited to your account within 24 hours of purchase. Note that in case of purchases at the FirstCry store, Club Cash earned by you is recorded against your mobile number if you are a club member. Please ensure you share the correct mobile number which has an active club membership at the time of purchase.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">3. How is my Club Cash Calculated on products?</b>
                                    <p className="mt-1">Your Club Cash earnings vary on the basis of the membership plan & products bought by you on Firstcry.com. The Club Cash against the product, if available for that product, is aimed at maximizing the value provided to you. If you have availed any offer which provides product(s) for free in your order, you will not earn Club Cash for that product. If you decide to earn PAYBACK points for your order, you will not earn any Club Cash for that order.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">4. How do I redeem my Club Cash?</b>
                                    <p className="mt-1">The option to redeem your Club Cash would be available to you at the time of checkout when you will be finalizing your cart for purchases <br />You cannot redeem your earned Club Cash against any extra charges such as shipping charges and Cash on Delivery Charges. You can check out our Shipping Policy and Payment Policy for more details.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">5. What happens if I return/cancel my order?</b>
                                    <p className="mt-1">If you have used Club Cash while placing an order and the order has got returned/canceled, it usually takes one day to reverse the amount back to your Club Cash section in your account</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">6. Will my Club Cash expire if I don’t use it?</b>
                                    <p className="mt-1">Club cash earned by you will expire 180 days after your last transaction involving an eligible club cash earn or till the club membership expiry date, whichever is greater.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">7. Can I redeem Club Cash earned on the FirstCry website at the FirstCry Stores and vice-versa?</b>
                                    <p className="mt-1">Yes<br />Club Cash earned on online purchases at FirstCry.com is recorded in the My Account section of your profile. You can use any Club Cash earned on FirstCry.com at a FirstCry store once you verify your registered mobile phone number in your FirstCry.com account.<br />Club Cash earned on purchases at a FirstCry store is recorded against your mobile number. Once you have verified this mobile number in your FirstCry.com online account, you can use the Club Cash earned at the FirstCry store on the FirstCry.com website & apps <br /> Note: Club Cash earning on eligible product purchases is exclusive for club members.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">8. Can I Earn Club Cash if I am not a club member?</b>
                                    <p className="mt-1">Yes, you can earn Club Cash if you are not a club member by different Activities/Events Firstcry conducts. User will be notified for such Programs.<br /> Note: Club Cash earning on online purchases is exclusive for club members</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">9. How do I track the Club Cash I have earned?</b>
                                    <p className="mt-1">Please visit the My Profile section under My Account and go to Club Cash section and out there you will see all the details of the Club Cash which you have earned and redeemed.</p>
                                </div>
                            </div>
                        </div>

                        {/* EMI FAQs */}
                        <div className="mt-8">
                            <div className="Shopcar_pageHead border-b border-gray-300 pb-2 mb-4">
                                <ul className="shopcartpage_ul">
                                    <li className="shopcartpage_li_1 w-full md:w-[600px] pt-1 pl-0 font-bold text-lg">EMI FAQs</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <b className="text-gray-900">1. What is EMI?</b>
                                    <p className="mt-1">EMI stands for Equated Monthly Installment. It is a payment plan that allows you to pay for a large purchase over a period of time, in fixed monthly installments.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">2. What are the benefits of using EMI?</b>
                                    <p className="mt-1">EMI allows you to spread out the cost of a large purchase, making it more affordable.<br />EMI can help you build your credit history.<br />EMI can offer you no-cost EMI options, which means you won&apos;t have to pay any interest on your purchase.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">3. What are the different types of EMI?</b>
                                    <p className="mt-1">There are two main types of EMI:<br />Credit card EMI: This is an EMI that is offered by credit card companies. You can use your credit card to make a purchase, and then the credit card company will convert the purchase into an EMI plan.<br />Debit card EMI: This is an EMI that is offered by some banks. You can use your debit card to make a purchase, and then the bank will convert the purchase into an EMI plan.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">4. How do I know if I am eligible for EMI?</b>
                                    <p className="mt-1">You will need to check with your credit card or debit card issuer to see if you are eligible for EMI. They will usually ask you for your credit score and income.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">5. How do make a purchase with EMI?</b>
                                    <p className="mt-1">You can apply for EMI when you are making a purchase. FirstCry will usually ask you if you want to pay in EMI. If you do, they will give you the option to choose a credit card or debit card EMI plan. EMI is only available on Firstcry for orders above Rs. 3000. This value may be subject to change at FirstCry’s discretion.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">6. How do I make EMI payments?</b>
                                    <p className="mt-1">You will need to make your EMI payments on a monthly basis. They will be charged on your Debit/Credit Card.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">7. What happens if I miss an EMI payment?</b>
                                    <p className="mt-1">If you miss an EMI payment, you will be charged a late fee. You may also be charged interest on the outstanding balance.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">8. How does Debit EMI work?</b>
                                    <p className="mt-1">Debit EMI is a new EMI method. The bank won&apos;t block your card and you don&apos;t need the full amount in your account to transact. Your bank will deduct the monthly EMI from your account using the pre-approved overdraft facility.<br />Currently, Only HDFC, SBI, Axis, ICICI, and Kotak Mahindra debit cards offer EMI.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">9. Why am I not getting EMI option?</b>
                                    <p className="mt-1">EMI is only available on FirstCry on orders above Rs. 3000.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">10. Why has my EMI not been processed?</b>
                                    <p className="mt-1">Banks process EMIs within 2-4 days. It will initially deduct the whole money from your credit/debit card and convert the amount (expect down payment) into EMI within 2-4 days.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">11. How can I close my EMI earlier?</b>
                                    <p className="mt-1">For EMI purchases using credit/debit card purchases: Contact your bank to close your EMI early, subject to foreclosure fees as per their policy.</p>
                                </div>

                                <div>
                                    <b className="text-gray-900">12. What will happen to EMI if I cancel the order?</b>
                                    <p className="mt-1">If you cancel or return an EMI order purchased using credit cards / debit cards, FirstCry will refund the full purchase amount to your original payment method and cancel the EMI . Any down payment will be refunded within 4-5 business days. You will then need to contact your bank to confirm the cancellation.<br />For credit cards: Your card issuing bank may charge nominal pre-closure charges in case you&apos;ve already paid an EMI. For more details on EMI closure, please contact the card issuing bank.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;